import logging


class Logger(object):
    def __init__(self, filename, logName, logLevel):
        logging.basicConfig(
            filename=filename,
            filemode="a+",
            format="%(levelname)s %(asctime)s - %(message)s",
            level=logging.DEBUG
        )
        self.log = logging.getLogger(logName)

    def error(self, message):
        self.log.error(message)

    def debug(self, message):
        self.log.debug(message)

    def warning(self, message):
        self.log.warning(message)

    def info(self, message):
        self.log.info(message)
