param(
  [Parameter(Mandatory=$true)][string]$InputDirectory,
  [Parameter(Mandatory=$true)][string]$OutputPath,
  [string]$Language = 'en-US'
)

# Local Windows OCR: no images or recognized text leave this machine.
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime]
$ocrTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.IsGenericMethodDefinition -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1

function Wait-OcrOperation($Operation, [Type]$ResultType) {
  $task = $ocrTaskMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  return $task.Result
}

$ocrLanguage = New-Object Windows.Globalization.Language($Language)
$ocrEngine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($ocrLanguage)
if ($null -eq $ocrEngine) { throw "OCR language is not installed: $Language" }
$ocrResults = @()
$ocrFiles = Get-ChildItem -LiteralPath $InputDirectory -File -Recurse | Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg', '.bmp' }
foreach ($ocrFile in $ocrFiles) {
  $storageFile = Wait-OcrOperation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($ocrFile.FullName)) ([Windows.Storage.StorageFile])
  $stream = Wait-OcrOperation ($storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  try {
    $decoder = Wait-OcrOperation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Wait-OcrOperation ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    try {
      $result = Wait-OcrOperation ($ocrEngine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
      $lines = @($result.Lines | ForEach-Object {
        @{ text = $_.Text; words = @($_.Words | ForEach-Object {
          @{ text = $_.Text; x = $_.BoundingRect.X; y = $_.BoundingRect.Y; width = $_.BoundingRect.Width; height = $_.BoundingRect.Height }
        }) }
      })
      $ocrResults += @{ file = $ocrFile.FullName; width = $bitmap.PixelWidth; height = $bitmap.PixelHeight; text = $result.Text; lines = $lines }
    } finally { $bitmap.Dispose() }
  } finally { $stream.Dispose() }
}
$ocrResults | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $OutputPath -Encoding UTF8
Write-Output "OCR complete: $($ocrResults.Count) images ($Language). Results saved locally."
