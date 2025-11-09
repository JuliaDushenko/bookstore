"""
Django settings for config project — Лабораторна №3.
Підключення до PostgreSQL (Supabase) через .env + REST API + Swagger + CORS.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# 1) Зчитуємо .env (DATABASE_URL, DEBUG, SECRET_KEY, ALLOWED_ORIGINS)
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# 2) Безпека / налагодження
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-temp-key')
DEBUG = os.getenv('DJANGO_DEBUG', '1') == '1'
ALLOWED_HOSTS = ['*']  # ок для локальної розробки

# 3) Додатки
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # API і документація
    'rest_framework',
    'drf_spectacular',
    'corsheaders',

    # наш застосунок з моделями/в'юшками
    'api',
]

# 4) Проміжне ПЗ (middleware)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # CORS до CommonMiddleware - так радить django-cors-headers
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# 5) База даних: читаємо з DATABASE_URL (dj-database-url)
#    Якщо .env не задано — fallback на SQLite, щоб не блокувати розробку.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    try:
        import dj_database_url  # пакет спрощує парсинг URL
        DATABASES['default'] = dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require='sslmode=require' in DATABASE_URL
        )
    except ImportError:
        # Якщо пакет не встановлено — ручний парсинг (працюватиме теж)
        from urllib.parse import urlparse, unquote
        parsed = urlparse(DATABASE_URL)
        DATABASES['default'] = {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': parsed.path.lstrip('/'),
            'USER': unquote(parsed.username) if parsed.username else '',
            'PASSWORD': unquote(parsed.password) if parsed.password else '',
            'HOST': parsed.hostname,
            'PORT': parsed.port or '5432',
            'OPTIONS': {'sslmode': 'require'} if 'sslmode=require' in (parsed.query or '') else {},
        }

# 6) DRF + OpenAPI (Swagger)
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
SPECTACULAR_SETTINGS = {
    'TITLE': 'BookStore API',
    'DESCRIPTION': 'REST API для веб-книгарні (Lab3)',
    'VERSION': '1.0.0',
}

# 7) Локаль/час/статичні
LANGUAGE_CODE = 'uk'
TIME_ZONE = 'Europe/Kyiv'
USE_I18N = True
USE_TZ = True
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 8) CORS: дозволяємо фронтенду звертатись до бекенду
CORS_ALLOWED_ORIGINS = [
    os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173'),
]
CORS_ALLOW_CREDENTIALS = True
