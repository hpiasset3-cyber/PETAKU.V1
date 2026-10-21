"""Menambahkan izin lokasi ke AndroidManifest.xml hasil `cap add android`."""
import pathlib, sys

p = pathlib.Path("android/app/src/main/AndroidManifest.xml")
if not p.exists():
    sys.exit("AndroidManifest.xml tidak ditemukan. Jalankan `npx cap add android` dulu.")

perms = [
    "android.permission.INTERNET",
    "android.permission.ACCESS_NETWORK_STATE",
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.ACCESS_COARSE_LOCATION",
]
x = p.read_text(encoding="utf-8")
add = "".join(
    f'    <uses-permission android:name="{n}" />\n'
    for n in perms if f'android:name="{n}"' not in x
)
if add:
    x = x.replace("</manifest>", add + "</manifest>")
    p.write_text(x, encoding="utf-8")
print("Izin diperbarui:" if add else "Izin sudah lengkap.", add.strip())
