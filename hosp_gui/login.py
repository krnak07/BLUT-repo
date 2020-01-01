# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'login.ui'
#
# Created by: PyQt5 UI code generator 5.13.2
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
from bloodbank import Ui_bMainWindow
from dialog import Ui_Dialog
import bag_img
import requests
global m_url,data
m_url = 'http://52.15.136.221:3000'

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1280, 720)
        MainWindow.setMinimumSize(QtCore.QSize(1280, 720))
        MainWindow.setMaximumSize(QtCore.QSize(1280, 720))
        MainWindow.setCursor(QtGui.QCursor(QtCore.Qt.ArrowCursor))
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(":/login-img/blood.png"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        MainWindow.setWindowIcon(icon)
        MainWindow.setStyleSheet("background-color: none;\n"
"border-image:url(:/login-img/login-img);\n"
"background : none;\n"
"border : rgb(255, 255, 255);\n"
"background-repeat : none;\n"
"color: rgb(255, 255, 255);\n"
"")
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.email_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.email_ip.setGeometry(QtCore.QRect(1030, 330, 161, 22))
        font = QtGui.QFont()
        font.setFamily("Segoe UI")
        font.setBold(True)
        self.email_ip.setFont(font)
        self.email_ip.setStyleSheet("#email_ip\n"
"{\n"
"background-color: none;\n"
"border-image:none;\n"
"background : none;\n"
"border : rgb(255, 255, 255);\n"
"background-repeat : none;\n"
"color: rgb(112, 112, 112);\n"
"}")
        self.email_ip.setObjectName("email_ip")
        self.password_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.password_ip.setGeometry(QtCore.QRect(1030, 390, 161, 21))
        font = QtGui.QFont()
        font.setFamily("Segoe UI")
        self.password_ip.setFont(font)
        self.password_ip.setStyleSheet("#password_ip\n"
"{\n"
"background-color: none;\n"
"border-image:none;\n"
"background : none;\n"
"border : rgb(255, 255, 255);\n"
"background-repeat : none;\n"
"color: rgb(112, 112, 112);\n"
"}")
        self.password_ip.setEchoMode(QtWidgets.QLineEdit.Password)
        self.password_ip.setAlignment(QtCore.Qt.AlignLeading|QtCore.Qt.AlignLeft|QtCore.Qt.AlignTop)
        self.password_ip.setObjectName("password_ip")
        self.login_btn = QtWidgets.QPushButton(self.centralwidget)
        self.login_btn.setGeometry(QtCore.QRect(1050, 456, 51, 20))
        self.login_btn.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.login_btn.setStyleSheet("#login_btn\n"
"{\n"
"background-color: none;\n"
"border-image:none;\n"
"background : none;\n"
"border : rgb(255, 255, 255);\n"
"background-repeat : none;\n"
"color: rgb(112, 112, 112);\n"
"}")
        self.login_btn.setText("")
        self.login_btn.setObjectName("login_btn")
        self.cancel_btn = QtWidgets.QPushButton(self.centralwidget)
        self.cancel_btn.setGeometry(QtCore.QRect(1120, 456, 51, 20))
        self.cancel_btn.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.cancel_btn.setStyleSheet("#cancel_btn\n"
"{\n"
"background-color: none;\n"
"border-image:none;\n"
"background : none;\n"
"border : rgb(255, 255, 255);\n"
"background-repeat : none;\n"
"color: rgb(112, 112, 112);\n"
"}")
        self.cancel_btn.setText("")
        self.cancel_btn.setObjectName("cancel_btn")
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        self.login_btn.clicked.connect(self.login)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "BLUT"))

    def login(self):
        global m_url, data

        URL = m_url + '/api/bloodbank/login'
        params = {'email' : 'krnak07@gmail.com',#self.email_ip.text(),
            'password' : '1234567' } #self.password_ip.text() }
        r = requests.post(url=URL, data=params)
        data = r.json()
        if(r.status_code == 200 and data!=[]):
            self.sMainWindow = QtWidgets.QMainWindow()
            self.ui = Ui_bMainWindow()
            self.ui.setupUi(self.sMainWindow, m_url, data)
            MainWindow.hide()
            self.sMainWindow.show()
        else:
            err_txt = data['code'].split('/')
            Dialog = QtWidgets.QDialog()
            ui = Ui_Dialog()
            ui.setupUi(Dialog)
            ui.err_label.setText(err_txt[1])
            Dialog.exec_()






if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
