# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file '.\SIGNUP.ui'
#
# Created by: PyQt5 UI code generator 5.13.0
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
import requests


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1600, 900)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(MainWindow.sizePolicy().hasHeightForWidth())
        MainWindow.setSizePolicy(sizePolicy)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(1360, 870, 101, 21))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(500, 200, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.nofins = QtWidgets.QLineEdit(self.centralwidget)
        self.nofins.setGeometry(QtCore.QRect(830, 210, 281, 22))
        self.nofins.setObjectName("nofins")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(500, 250, 271, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_3.setFont(font)
        self.label_3.setObjectName("label_3")
        self.email = QtWidgets.QLineEdit(self.centralwidget)
        self.email.setGeometry(QtCore.QRect(830, 260, 281, 22))
        self.email.setObjectName("email")
        self.label_4 = QtWidgets.QLabel(self.centralwidget)
        self.label_4.setGeometry(QtCore.QRect(500, 300, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_4.setFont(font)
        self.label_4.setObjectName("label_4")
        self.repass = QtWidgets.QLineEdit(self.centralwidget)
        self.repass.setGeometry(QtCore.QRect(830, 360, 281, 22))
        self.repass.setObjectName("repass")
        self.label_5 = QtWidgets.QLabel(self.centralwidget)
        self.label_5.setGeometry(QtCore.QRect(500, 350, 271, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_5.setFont(font)
        self.label_5.setObjectName("label_5")
        self.passw = QtWidgets.QLineEdit(self.centralwidget)
        self.passw.setGeometry(QtCore.QRect(830, 310, 281, 22))
        self.passw.setObjectName("passw")
        self.label_6 = QtWidgets.QLabel(self.centralwidget)
        self.label_6.setGeometry(QtCore.QRect(500, 400, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_6.setFont(font)
        self.label_6.setObjectName("label_6")
        self.label_7 = QtWidgets.QLabel(self.centralwidget)
        self.label_7.setGeometry(QtCore.QRect(500, 450, 271, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_7.setFont(font)
        self.label_7.setObjectName("label_7")
        self.phoneno = QtWidgets.QLineEdit(self.centralwidget)
        self.phoneno.setGeometry(QtCore.QRect(830, 410, 281, 22))
        self.phoneno.setObjectName("phoneno")
        self.addr = QtWidgets.QTextEdit(self.centralwidget)
        self.addr.setGeometry(QtCore.QRect(830, 460, 281, 101))
        self.addr.setObjectName("addr")
        self.label_8 = QtWidgets.QLabel(self.centralwidget)
        self.label_8.setGeometry(QtCore.QRect(500, 580, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(16)
        font.setBold(True)
        font.setWeight(75)
        self.label_8.setFont(font)
        self.label_8.setObjectName("label_8")
        self.lisc = QtWidgets.QLineEdit(self.centralwidget)
        self.lisc.setGeometry(QtCore.QRect(830, 590, 281, 22))
        self.lisc.setObjectName("lisc")
        self.pushButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton.setGeometry(QtCore.QRect(830, 630, 93, 28))
        self.pushButton.setObjectName("pushButton")
        self.pushButton_2 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_2.setGeometry(QtCore.QRect(830, 720, 93, 28))
        self.pushButton_2.setObjectName("pushButton_2")
        self.pushButton_3 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_3.setGeometry(QtCore.QRect(730, 720, 93, 28))
        self.pushButton_3.setObjectName("pushButton_3")
        MainWindow.setCentralWidget(self.centralwidget)
        self.pushButton_3.clicked.connect(self.signu)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "SIGN UP"))
        self.label_2.setText(_translate("MainWindow", "Status : "))
        self.label.setText(_translate("MainWindow", "NAME OF INSTITUTION  "))
        self.label_3.setText(_translate("MainWindow", "E-MAIL                                  "))
        self.label_4.setText(_translate("MainWindow", "PASSWORD                          "))
        self.label_5.setText(_translate("MainWindow", "REPEAT PASSWORD       "))
        self.label_6.setText(_translate("MainWindow", "PHONE NO."))
        self.label_7.setText(_translate("MainWindow", "ADDRESS"))
        self.label_8.setText(_translate("MainWindow", "LISCENSE"))
        self.pushButton.setText(_translate("MainWindow", "BROWSE"))
        self.pushButton_2.setText(_translate("MainWindow", "CANCEL"))
        self.pushButton_3.setText(_translate("MainWindow", "SIGN UP"))

    def signup(self):
        URL='https://average-mole-22.localtunnel.me/api/hospitals/signup'
        params = { 'name' : self.nofins.text(),
            'adr' : self.addr.toPlainText(),
            'email' : self.email.text(),
            'password' : self.repass.text(),
            'phone' : int(self.phoneno.text()),
            'lis' : self.lisc.text() }
        r = requests.post(url = URL,data = params)
        self.label_2.setText(str(r.status_code))
        print(r)

    def signu(self):
        i = input('Enter : ')
        if i.isnumeric():
            print('yes')

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
