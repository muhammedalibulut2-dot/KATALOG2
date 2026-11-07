@echo off
chcp 65001 > nul
title ÇAĞ TEKNİK - YEDEK PARÇA KATALOĞU
color 06

echo ===================================================
echo     ÇAĞ TEKNİK - YEDEK PARÇA KATALOĞU BAŞLATICI
echo ===================================================
echo.

cd /d "c:\Users\lokman\Documents\KATALOG"

:: Node.js kontrolü
where npm >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [HATA] Bilgisayarınızda Node.js kurulu görünmüyor!
    echo Lütfen https://nodejs.org adresinden Node.js indirip kurunuz.
    echo.
    pause
    exit /b
)

:: Paketlerin yüklenmesi
if not exist "node_modules" (
    echo [1/2] Gerekli paketler ilk kez indiriliyor...
    echo (Bu işlem internet hızınıza bağlı olarak 30-60 saniye sürebilir, lütfen bekleyin)
    call npm install
    if %errorlevel% neq 0 (
        color 0c
        echo [HATA] Paketler yüklenirken bir sorun oluştu!
        pause
        exit /b
    )
) else (
    echo [1/2] Paketler zaten kurulu, kontrol edildi.
)

echo.
echo [2/2] Sunucu başlatılıyor...
echo.
echo ===================================================
echo   Sunucu açıldığında tarayıcı otomatik açılacaktır.
echo   LÜTFEN BU SİYAH PENCEREYİ KAPATMAYIN!
echo ===================================================
echo.

:: Sunucuyu başlat
timeout /t 3 /nobreak >nul
start http://localhost:3000
call npm run dev

pause
