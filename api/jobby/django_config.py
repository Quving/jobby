import os


class DjangoConfig:
    PROJECT_NAME = 'JOBBY'

    if os.getenv('DJANGO_MODE') == 'production':
        IS_DEBUG = False
    elif os.getenv('DJANGO_MODE') == 'development':
        IS_DEBUG = True
    else:
        IS_DEBUG = False

    SECRET_KEY = os.getenv(PROJECT_NAME + '_SECRET_KEY', None)
    DB_NAME = os.getenv(PROJECT_NAME + "_DB_NAME", None)
    DB_USER = os.getenv(PROJECT_NAME + "_DB_USER", None)
    DB_PASS = os.getenv(PROJECT_NAME + "_DB_PASS", None)
    DB_HOST = os.getenv(PROJECT_NAME + "_DB_HOST", None)
    DB_PORT = int(os.getenv(PROJECT_NAME + "_DB_PORT", None))
    EMAIL_HOST = os.getenv(PROJECT_NAME + "_EMAIL_HOST", None)
    EMAIL_USER = os.getenv(PROJECT_NAME + "_EMAIL_USER", None)
    EMAIL_PASS = os.getenv(PROJECT_NAME + "_EMAIL_PASS", None)
    EMAIL_DEFAULT = os.getenv(PROJECT_NAME + "_EMAIL_DEFAULT", None)

    def check_env(self):
        attrs = [i for i in dir(self) if not i.startswith('_') and i.isupper()]
        for attr in attrs:
            if getattr(self, attr) is None:
                raise Exception('Env \'{}\' is not set.'.format(attr))
