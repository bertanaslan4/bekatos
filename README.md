# Bekatos Web Sitesi

Bekatos şirketinin kurumsal web sitesi. Statik HTML, CSS ve görsellerden oluşur; sunucu tarafı kodu yoktur.

Bekatos; QR kod çözümleri, web uygulama geliştirme, mobil uygulama ve yönetim sistemleri alanlarında hizmet veren bir yazılım şirketidir.

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa |
| `about.html` | Hakkımızda |
| `services.html` | Hizmetler |
| `web-development.html` | Web geliştirme |
| `mobile-development.html` | Mobil geliştirme |
| `qr-solutions.html` | QR kod çözümleri |
| `management-systems.html` | Yönetim sistemleri |
| `contact.html` | İletişim |
| `kvkk.html`, `arm.html` | KVKK aydınlatma ve açık rıza metinleri |
| `ekilavuz.html` | E-kılavuz |
| `eng/` | İngilizce sürüm |

## Yapı

- `style.css`: Ana stil dosyası
- `assets/`: Görseller ve diğer statik dosyalar
- `deploy/`: Yayınlama ile ilgili dosyalar
- `*.docx`: KVKK ve açık rıza metinlerinin Word sürümleri

## Çalıştırma

Statik site olduğu için herhangi bir derleme adımı gerekmez. `index.html` dosyasını tarayıcıda açmak yeterlidir. Yerel sunucu ile açmak isterseniz:

```bash
python3 -m http.server 8000
```

ardından `http://localhost:8000` adresine gidin.

## Lisans

Bu projede lisans dosyası bulunmamaktadır. Tüm hakları Bekatos'a aittir.
