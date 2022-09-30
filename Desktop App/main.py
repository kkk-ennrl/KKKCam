import multitasking
from re import escape
from base64 import b64decode
from PyQt5.QtCore import pyqtSlot
from PyQt5.QtCore import QUrl
from PyQt5.QtWidgets import QWidget, QApplication, QGridLayout
from signal import SIGINT
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtWebChannel import QWebChannel
from os import kill, getpid
import json
from flask import Flask, send_from_directory, redirect, request
from urllib.parse import unquote


class MainWindow(QWidget):
	def __init__(self, parent=None):
		QWidget.__init__(self, parent)
		self.setFixedSize(1000, 750)
		#self.setMinimumWidth(1000)
		#self.setMinimumHeight(560)
		self.resizable = False
		self.view = QWebEngineView(self)
		file = QUrl("http://localhost:65301")
		self.view.load(file)
		self.setWindowTitle("KKKCam - Desktop App")
		grid = QGridLayout()
		grid.addWidget(self.view, 0, 0)
		grid.setContentsMargins(0, 0, 0, 0)
		self.setLayout(grid)
		self.view.reload()
		self.show()

app = Flask("app")

def replacer(filename):
	file = open(filename, "r", encoding='utf-8')
	data = file.read()


	return data

@app.route("/")
def index():
	return replacer("files/index.html")
@app.route("/static/<path:path>")
def static_return(path):
	return send_from_directory("static", path)

@app.route("/config/get/")
def getConfig():
	return send_from_directory("", "config.json")

@app.route("/config/set/<key>/<value>")
def setSettings(path):
	file = open("config.json", "r", encoding="utf-8").read()
	file = json.loads(file)

	file["settings"][key] = value

	d = open("config.json", "w", encoding="utf-8")
	d.write(json.dumps(file))
	d.close()
	return "ok"
	


@multitasking.task
def FlaskApp():
	app.run(host="localhost", port=65301)
@multitasking.task
def StartApp():
	myapp = QApplication([])
	dlg = MainWindow()
	myapp.exec_()
	kill(getpid(), SIGINT)

if __name__ == '__main__':
	StartApp()
	FlaskApp()