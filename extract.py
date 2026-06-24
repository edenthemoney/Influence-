import email
import os
import sys

models = [
    ('/Users/edenroy/Downloads/Des Daisha.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Daisha', 'daisha'),
    ('/Users/edenroy/Downloads/Kiki.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Kiki', 'kiki'),
    ('/Users/edenroy/Downloads/Amanda pics.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Amanda', 'amanda'),
    ('/Users/edenroy/Downloads/Seahra model pics.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Seahra', 'seahra'),
    ('/Users/edenroy/Downloads/Scarlet.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Scarlet', 'scarlet'),
    ('/Users/edenroy/Downloads/Jas.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Jas', 'jas'),
    ('/Users/edenroy/Downloads/Aliyana.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Aliyana', 'aliyana'),
    ('/Users/edenroy/Downloads/Ayana Alvarez- Requested Photos.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Ayana', 'ayana'),
    ('/Users/edenroy/Downloads/New model Nisha.eml', '/Users/edenroy/Downloads/INFLUENCE/public/images/Nisha', 'nisha'),
]

for eml_path, out_dir, prefix in models:
    if not os.path.exists(eml_path):
        print(f"SKIP: {eml_path} not found")
        continue
    os.makedirs(out_dir, exist_ok=True)
    with open(eml_path, 'rb') as f:
        msg = email.message_from_bytes(f.read())
    count = 0
    for part in msg.walk():
        ct = part.get_content_type()
        if ct.startswith('image/'):
            payload = part.get_payload(decode=True)
            if payload and len(payload) > 1000:
                count += 1
                ext = 'jpg' if 'jpeg' in ct else ct.split('/')[-1]
                filename = f'{prefix}-{count}.{ext}'
                filepath = os.path.join(out_dir, filename)
                with open(filepath, 'wb') as img:
                    img.write(payload)
    print(f"{prefix}: {count} images")

print("Done!")
