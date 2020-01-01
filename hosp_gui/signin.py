# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'signin.ui'
#
# Created by: PyQt5 UI code generator 5.13.0
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
import requests

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(837, 636)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(60, 80, 101, 31))
        self.label.setObjectName("label")
        self.lineEdit = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit.setGeometry(QtCore.QRect(110, 79, 241, 31))
        self.lineEdit.setObjectName("lineEdit")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(420, 81, 101, 31))
        self.label_2.setObjectName("label_2")
        self.lineEdit_2 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_2.setGeometry(QtCore.QRect(490, 80, 241, 31))
        self.lineEdit_2.setObjectName("lineEdit_2")
        self.verticalLayoutWidget = QtWidgets.QWidget(self.centralwidget)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(400, 200, 391, 371))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.verticalLayout = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName("verticalLayout")
        self.name = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.name.setObjectName("name")
        self.verticalLayout.addWidget(self.name)
        self.h_id = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.h_id.setObjectName("h_id")
        self.verticalLayout.addWidget(self.h_id)
        self.email = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.email.setObjectName("email")
        self.verticalLayout.addWidget(self.email)
        self.phone = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.phone.setObjectName("phone")
        self.verticalLayout.addWidget(self.phone)
        self.adr = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.adr.setObjectName("adr")
        self.verticalLayout.addWidget(self.adr)
        self.lisc = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.lisc.setObjectName("lisc")
        self.verticalLayout.addWidget(self.lisc)
        self.pushButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton.setGeometry(QtCore.QRect(340, 140, 93, 28))
        self.pushButton.setObjectName("pushButton")
        self.verticalLayoutWidget_2 = QtWidgets.QWidget(self.centralwidget)
        self.verticalLayoutWidget_2.setGeometry(QtCore.QRect(330, 200, 391, 371))
        self.verticalLayoutWidget_2.setObjectName("verticalLayoutWidget_2")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.verticalLayoutWidget_2)
        self.verticalLayout_2.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.name_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.name_2.setObjectName("name_2")
        self.verticalLayout_2.addWidget(self.name_2)
        self.h_id_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.h_id_2.setObjectName("h_id_2")
        self.verticalLayout_2.addWidget(self.h_id_2)
        self.email_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.email_2.setObjectName("email_2")
        self.verticalLayout_2.addWidget(self.email_2)
        self.phone_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.phone_2.setObjectName("phone_2")
        self.verticalLayout_2.addWidget(self.phone_2)
        self.adr_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.adr_2.setObjectName("adr_2")
        self.verticalLayout_2.addWidget(self.adr_2)
        self.lisc_2 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.lisc_2.setObjectName("lisc_2")
        self.verticalLayout_2.addWidget(self.lisc_2)
        MainWindow.setCentralWidget(self.centralwidget)
        self.pushButton.clicked.connect(self.login)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "SIGN IN"))
        self.label.setText(_translate("MainWindow", "E-MAIL :"))
        self.label_2.setText(_translate("MainWindow", "PASSWORD : "))
        self.name.setText(_translate("MainWindow", "TextLabel"))
        self.h_id.setText(_translate("MainWindow", "TextLabel"))
        self.email.setText(_translate("MainWindow", "TextLabel"))
        self.phone.setText(_translate("MainWindow", "TextLabel"))
        self.adr.setText(_translate("MainWindow", "TextLabel"))
        self.lisc.setText(_translate("MainWindow", "TextLabel"))
        self.pushButton.setText(_translate("MainWindow", "SIGN IN"))
        self.name_2.setText(_translate("MainWindow", "NAME        :"))
        self.h_id_2.setText(_translate("MainWindow", "ID              :"))
        self.email_2.setText(_translate("MainWindow", "EMAIL        : "))
        self.phone_2.setText(_translate("MainWindow", "PHONE       : "))
        self.adr_2.setText(_translate("MainWindow", "ADDRESS   : "))
        self.lisc_2.setText(_translate("MainWindow", "LISCENSE   : "))

    def login(self):
        URL='https://calm-pig-69.localtunnel.me/api/hospitals/login'
        params = {'email' : self.lineEdit.text(),
            'password' : self.lineEdit_2.text() }
        r = requests.post(url = URL,data = params)
        data = r.json()

        if(r.status_code == 200):
            self.name.setText(data['name'])
            self.h_id.setText(data['_id'])
            self.email.setText(data['email'])
            self.adr.setText(data['address'])
            self.lisc.setText(data['liscense'])
            self.phone.setText(str(data['phoneNo']))
        else:
            print(data)




if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
