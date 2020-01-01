# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'camp.ui'
#
# Created by: PyQt5 UI code generator 5.13.2
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
from camp_diaog import Ui_Dialog
import requests
global m_url,data,m_new
m_url = 'http://52.15.136.221:3000'


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1024, 768)
        MainWindow.setMinimumSize(QtCore.QSize(1024, 768))
        MainWindow.setMaximumSize(QtCore.QSize(1024, 768))
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.email_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.email_ip.setGeometry(QtCore.QRect(240, 20, 271, 22))
        self.email_ip.setObjectName("email_ip")
        self.password_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.password_ip.setGeometry(QtCore.QRect(530, 20, 271, 22))
        self.password_ip.setObjectName("password_ip")
        self.login_btn = QtWidgets.QPushButton(self.centralwidget)
        self.login_btn.setGeometry(QtCore.QRect(470, 50, 93, 28))
        self.login_btn.setObjectName("login_btn")
        self.tabWidget = QtWidgets.QTabWidget(self.centralwidget)
        self.tabWidget.setGeometry(QtCore.QRect(0, 100, 1031, 671))
        self.tabWidget.setObjectName("tabWidget")
        self.info_tab = QtWidgets.QWidget()
        self.info_tab.setObjectName("info_tab")
        self.verticalLayoutWidget_2 = QtWidgets.QWidget(self.info_tab)
        self.verticalLayoutWidget_2.setGeometry(QtCore.QRect(450, 20, 491, 591))
        self.verticalLayoutWidget_2.setObjectName("verticalLayoutWidget_2")
        self.verticalLayout_6 = QtWidgets.QVBoxLayout(self.verticalLayoutWidget_2)
        self.verticalLayout_6.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_6.setObjectName("verticalLayout_6")
        self.name_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.name_6.setObjectName("name_6")
        self.verticalLayout_6.addWidget(self.name_6)
        self.location_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.location_6.setObjectName("location_6")
        self.verticalLayout_6.addWidget(self.location_6)
        self.date_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.date_6.setObjectName("date_6")
        self.verticalLayout_6.addWidget(self.date_6)
        self.phone_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.phone_6.setObjectName("phone_6")
        self.verticalLayout_6.addWidget(self.phone_6)
        self.bb_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.bb_6.setObjectName("bb_6")
        self.verticalLayout_6.addWidget(self.bb_6)
        self.verticalLayoutWidget = QtWidgets.QWidget(self.info_tab)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(530, 20, 621, 591))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.verticalLayout_5 = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_5.setObjectName("verticalLayout_5")
        self.name_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.name_5.setObjectName("name_5")
        self.verticalLayout_5.addWidget(self.name_5)
        self.location_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.location_5.setObjectName("location_5")
        self.verticalLayout_5.addWidget(self.location_5)
        self.date_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.date_5.setObjectName("date_5")
        self.verticalLayout_5.addWidget(self.date_5)
        self.phone_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.phone_5.setObjectName("phone_5")
        self.verticalLayout_5.addWidget(self.phone_5)
        self.bb_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.bb_5.setObjectName("bb_5")
        self.verticalLayout_5.addWidget(self.bb_5)
        self.tabWidget.addTab(self.info_tab, "")
        self.donatios_tab = QtWidgets.QWidget()
        self.donatios_tab.setObjectName("donatios_tab")
        self.tableWidget_3 = QtWidgets.QTableWidget(self.donatios_tab)
        self.tableWidget_3.setGeometry(QtCore.QRect(300, 120, 441, 331))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.tableWidget_3.sizePolicy().hasHeightForWidth())
        self.tableWidget_3.setSizePolicy(sizePolicy)
        self.tableWidget_3.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
        self.tableWidget_3.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)
        self.tableWidget_3.setGridStyle(QtCore.Qt.DashDotLine)
        self.tableWidget_3.setWordWrap(True)
        self.tableWidget_3.setRowCount(10)
        self.tableWidget_3.setColumnCount(4)
        self.tableWidget_3.setObjectName("tableWidget_3")
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_3.setHorizontalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_3.setHorizontalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_3.setHorizontalHeaderItem(2, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_3.setHorizontalHeaderItem(3, item)
        self.tabWidget.addTab(self.donatios_tab, "")
        self.new_donation_tab = QtWidgets.QWidget()
        self.new_donation_tab.setObjectName("new_donation_tab")
        self.lineEdit_2 = QtWidgets.QLineEdit(self.new_donation_tab)
        self.lineEdit_2.setGeometry(QtCore.QRect(470, 260, 191, 22))
        self.lineEdit_2.setObjectName("lineEdit_2")
        self.label = QtWidgets.QLabel(self.new_donation_tab)
        self.label.setGeometry(QtCore.QRect(374, 210, 71, 20))
        self.label.setObjectName("label")
        self.dateEdit = QtWidgets.QDateEdit(self.new_donation_tab)
        self.dateEdit.setGeometry(QtCore.QRect(470, 310, 110, 22))
        self.dateEdit.setObjectName("dateEdit")
        self.label_2 = QtWidgets.QLabel(self.new_donation_tab)
        self.label_2.setGeometry(QtCore.QRect(370, 260, 91, 20))
        self.label_2.setObjectName("label_2")
        self.lineEdit = QtWidgets.QLineEdit(self.new_donation_tab)
        self.lineEdit.setGeometry(QtCore.QRect(470, 210, 191, 22))
        self.lineEdit.setObjectName("lineEdit")
        self.label_3 = QtWidgets.QLabel(self.new_donation_tab)
        self.label_3.setGeometry(QtCore.QRect(380, 310, 71, 20))
        self.label_3.setObjectName("label_3")
        self.pushButton = QtWidgets.QPushButton(self.new_donation_tab)
        self.pushButton.setGeometry(QtCore.QRect(420, 370, 75, 24))
        self.pushButton.setObjectName("pushButton")
        self.pushButton_2 = QtWidgets.QPushButton(self.new_donation_tab)
        self.pushButton_2.setGeometry(QtCore.QRect(500, 370, 75, 24))
        self.pushButton_2.setObjectName("pushButton_2")
        self.label_4 = QtWidgets.QLabel(self.new_donation_tab)
        self.label_4.setGeometry(QtCore.QRect(400, 440, 231, 20))
        self.label_4.setAlignment(QtCore.Qt.AlignCenter)
        self.label_4.setObjectName("label_4")
        self.tabWidget.addTab(self.new_donation_tab, "")

        MainWindow.setCentralWidget(self.centralwidget)
        self.login_btn.clicked.connect(self.login)
        self.pushButton.clicked.connect(self.donate)
        self.retranslateUi(MainWindow)
        self.tabWidget.setCurrentIndex(0)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.login_btn.setText(_translate("MainWindow", "Login"))
        self.name_6.setText(_translate("MainWindow", "NAME        :"))
        self.location_6.setText(_translate("MainWindow", "LOCATION  :"))
        self.date_6.setText(_translate("MainWindow", "DATE        : "))
        self.phone_6.setText(_translate("MainWindow", "PHONE       : "))
        self.bb_6.setText(_translate("MainWindow", "BLODBANK  : "))
        self.name_5.setText(_translate("MainWindow", "TextLabel"))
        self.location_5.setText(_translate("MainWindow", "TextLabel"))
        self.date_5.setText(_translate("MainWindow", "TextLabel"))
        self.phone_5.setText(_translate("MainWindow", "TextLabel"))
        self.bb_5.setText(_translate("MainWindow", "TextLabel"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.info_tab), _translate("MainWindow", "INFO"))
        self.tableWidget_3.setSortingEnabled(False)
        item = self.tableWidget_3.horizontalHeaderItem(0)
        item.setText(_translate("MainWindow", "DONOR_NAME"))
        item = self.tableWidget_3.horizontalHeaderItem(1)
        item.setText(_translate("MainWindow", "PHONE NO."))
        item = self.tableWidget_3.horizontalHeaderItem(2)
        item.setText(_translate("MainWindow", "BLOOD GROUP"))
        item = self.tableWidget_3.horizontalHeaderItem(3)
        item.setText(_translate("MainWindow", "UNITS"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.donatios_tab), _translate("MainWindow", "donations"))
        self.label.setText(_translate("MainWindow", "Phione NO."))
        self.label_2.setText(_translate("MainWindow", "Units Of Blood"))
        self.label_3.setText(_translate("MainWindow", "Date : "))
        self.pushButton.setText(_translate("MainWindow", "Okay"))
        self.pushButton_2.setText(_translate("MainWindow", "Cancel"))
        self.label_4.setText(_translate("MainWindow", "TextLabel"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.new_donation_tab), _translate("MainWindow", "donate"))


    def login(self):
        global m_url, data, m_new

        URL = m_url + '/api/bloodbank/login'
        params = {'email': 'krnak07@gmail.com',  # self.email_ip.text(),
                  'password': '1234567'}  # self.password_ip.text() }
        r = requests.post(url=URL, data=params)
        data = r.json()
        self.setup()
    def setup(self):
        global m_url, data, m_new

        URL = m_url + '/api/bloodbank/' + data['_id'] + '/allcamps'
        r = requests.get(url=URL)
        data_camp = r.json()

        if r.status_code == 200:
            Dialog = QtWidgets.QDialog()
            ui = Ui_Dialog()
            ui.setupUi(Dialog)
            for i in range(0, len(data_camp)):
                ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(data_camp[i]['name']))
                ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(data_camp[i]['location']))
                ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(data_camp[i]['dateofhost']))
            Dialog.exec_()

            camp_name = ui.label.text()
        else:
            print('error')


        if(camp_name == 'TextLabel'):
            self.setup()
        else:
            URL = m_url + '/api/bloodbank/' + data['_id'] + '/camps/getone?name=' + str(camp_name)
            r = requests.get(url=URL)
            data_camp = r.json()

            if r.status_code == 200:
                self.name_5.setText(data_camp['name'])
                self.location_5.setText(data_camp['location'])
                self.phone_5.setText(str(data_camp['phoneNo']))
                self.date_5.setText(data_camp['dateofhost'])
                self.bb_5.setText(data_camp['bloodbank'])

                m_new = m_url + '/api/bloodbank/' + data['_id'] + '/camps/' + data_camp['_id']
                self.update_donations()
            else:
                print('error')




    def update_donations(self):
        URL = m_new+'/donors'
        r = requests.get(url=URL)
        data_donations = r.json()

        if r.status_code == 200:
            k = len(data_donations)
            for i in range(0, len(data_donations)):
                k-=1
                self.tableWidget_3.setItem(i, 0, QtWidgets.QTableWidgetItem(data_donations[k]['donor_name']))
                self.tableWidget_3.setItem(i, 1, QtWidgets.QTableWidgetItem(str(data_donations[k]['phoneNo'])))
                self.tableWidget_3.setItem(i, 2, QtWidgets.QTableWidgetItem(data_donations[k]['bloodgroup']))
                self.tableWidget_3.setItem(i, 3, QtWidgets.QTableWidgetItem(str(data_donations[k]['unitsofblood'])))

    def donate(self):
        li = self.lineEdit.text()
        if (self.lineEdit.text() == '' or self.lineEdit_2.text() == ''):
            self.label_4.setText('Empty Field')
        else:
            URL = m_url + '/api/donor/check?ph=' + str(li)
            r = requests.get(url=URL)
            data_pro = r.json()
            if r.status_code == 200:
                if data_pro == []:
                    self.label_4.setText('User Not Found!')
                else:
                    URL = m_new+'/donation'
                    params = {'phoneNo': self.lineEdit.text(),
                              'dateofdonation': self.dateEdit.text(),
                              'units': self.lineEdit_2.text()}
                    r = requests.post(url=URL, data=params)
                    data_up = r.json()
                    self.label_4.setText('Done')
                    self.update_donations()
            else:
                self.label_4.setText('Error')


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
