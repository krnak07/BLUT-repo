# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'bloodbank.ui'
#
# Created by: PyQt5 UI code generator 5.13.2
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
import requests
global m_url,data
class Ui_bMainWindow(object):
    def setupUi(self, MainWindow, murl, d):
        global m_url,data
        m_url = murl
        data = d
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1024, 768)
        MainWindow.setMinimumSize(QtCore.QSize(1024, 768))
        MainWindow.setMaximumSize(QtCore.QSize(1024, 768))
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.email_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.email_ip.setGeometry(QtCore.QRect(240, 30, 271, 22))
        self.email_ip.setObjectName("email_ip")
        self.password_ip = QtWidgets.QLineEdit(self.centralwidget)
        self.password_ip.setGeometry(QtCore.QRect(530, 30, 271, 22))
        self.password_ip.setObjectName("password_ip")
        self.login_btn = QtWidgets.QPushButton(self.centralwidget)
        self.login_btn.setGeometry(QtCore.QRect(470, 60, 93, 28))
        self.login_btn.setObjectName("login_btn")
        self.info = QtWidgets.QTabWidget(self.centralwidget)
        self.info.setGeometry(QtCore.QRect(0, 90, 1031, 681))
        self.info.setObjectName("info")
        self.Info_tab = QtWidgets.QWidget()
        self.Info_tab.setObjectName("Info_tab")
        self.verticalLayoutWidget = QtWidgets.QWidget(self.Info_tab)
        self.verticalLayoutWidget.setGeometry(QtCore.QRect(520, 50, 621, 591))
        self.verticalLayoutWidget.setObjectName("verticalLayoutWidget")
        self.verticalLayout_5 = QtWidgets.QVBoxLayout(self.verticalLayoutWidget)
        self.verticalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_5.setObjectName("verticalLayout_5")
        self.name_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.name_5.setObjectName("name_5")
        self.verticalLayout_5.addWidget(self.name_5)
        self.h_id_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.h_id_5.setObjectName("h_id_5")
        self.verticalLayout_5.addWidget(self.h_id_5)
        self.email_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.email_5.setObjectName("email_5")
        self.verticalLayout_5.addWidget(self.email_5)
        self.phone_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.phone_5.setObjectName("phone_5")
        self.verticalLayout_5.addWidget(self.phone_5)
        self.adr_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.adr_5.setObjectName("adr_5")
        self.verticalLayout_5.addWidget(self.adr_5)
        self.lisc_5 = QtWidgets.QLabel(self.verticalLayoutWidget)
        self.lisc_5.setObjectName("lisc_5")
        self.verticalLayout_5.addWidget(self.lisc_5)
        self.verticalLayoutWidget_2 = QtWidgets.QWidget(self.Info_tab)
        self.verticalLayoutWidget_2.setGeometry(QtCore.QRect(440, 50, 491, 591))
        self.verticalLayoutWidget_2.setObjectName("verticalLayoutWidget_2")
        self.verticalLayout_6 = QtWidgets.QVBoxLayout(self.verticalLayoutWidget_2)
        self.verticalLayout_6.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_6.setObjectName("verticalLayout_6")
        self.name_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.name_6.setObjectName("name_6")
        self.verticalLayout_6.addWidget(self.name_6)
        self.h_id_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.h_id_6.setObjectName("h_id_6")
        self.verticalLayout_6.addWidget(self.h_id_6)
        self.email_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.email_6.setObjectName("email_6")
        self.verticalLayout_6.addWidget(self.email_6)
        self.phone_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.phone_6.setObjectName("phone_6")
        self.verticalLayout_6.addWidget(self.phone_6)
        self.adr_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.adr_6.setObjectName("adr_6")
        self.verticalLayout_6.addWidget(self.adr_6)
        self.lisc_6 = QtWidgets.QLabel(self.verticalLayoutWidget_2)
        self.lisc_6.setObjectName("lisc_6")
        self.verticalLayout_6.addWidget(self.lisc_6)
        self.info.addTab(self.Info_tab, "")
        self.bg_tab = QtWidgets.QWidget()
        self.bg_tab.setObjectName("bg_tab")
        self.lcdNumber = QtWidgets.QLCDNumber(self.bg_tab)
        self.lcdNumber.setGeometry(QtCore.QRect(500, 250, 64, 23))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        self.lcdNumber.setFont(font)
        self.lcdNumber.setObjectName("lcdNumber")
        self.label = QtWidgets.QLabel(self.bg_tab)
        self.label.setGeometry(QtCore.QRect(460, 250, 55, 21))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.lcdNumber_2 = QtWidgets.QLCDNumber(self.bg_tab)
        self.lcdNumber_2.setGeometry(QtCore.QRect(500, 280, 64, 23))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        self.lcdNumber_2.setFont(font)
        self.lcdNumber_2.setObjectName("lcdNumber_2")
        self.label_2 = QtWidgets.QLabel(self.bg_tab)
        self.label_2.setGeometry(QtCore.QRect(460, 280, 55, 21))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.lcdNumber_3 = QtWidgets.QLCDNumber(self.bg_tab)
        self.lcdNumber_3.setGeometry(QtCore.QRect(500, 310, 64, 23))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        self.lcdNumber_3.setFont(font)
        self.lcdNumber_3.setObjectName("lcdNumber_3")
        self.label_3 = QtWidgets.QLabel(self.bg_tab)
        self.label_3.setGeometry(QtCore.QRect(460, 310, 55, 21))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.label_3.setFont(font)
        self.label_3.setObjectName("label_3")
        self.lcdNumber_4 = QtWidgets.QLCDNumber(self.bg_tab)
        self.lcdNumber_4.setGeometry(QtCore.QRect(500, 340, 64, 23))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        self.lcdNumber_4.setFont(font)
        self.lcdNumber_4.setObjectName("lcdNumber_4")
        self.label_4 = QtWidgets.QLabel(self.bg_tab)
        self.label_4.setGeometry(QtCore.QRect(460, 340, 55, 21))
        font = QtGui.QFont()
        font.setFamily("Times New Roman")
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.label_4.setFont(font)
        self.label_4.setObjectName("label_4")
        self.info.addTab(self.bg_tab, "")
        self.camp_tab = QtWidgets.QWidget()
        self.camp_tab.setObjectName("camp_tab")
        self.tableWidget = QtWidgets.QTableWidget(self.camp_tab)
        self.tableWidget.setGeometry(QtCore.QRect(30, 130, 331, 331))
        self.tableWidget.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
        self.tableWidget.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)
        self.tableWidget.setRowCount(10)
        self.tableWidget.setColumnCount(3)
        self.tableWidget.setObjectName("tableWidget")
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(2, item)
        self.tableWidget_3 = QtWidgets.QTableWidget(self.camp_tab)
        self.tableWidget_3.setGeometry(QtCore.QRect(510, 60, 481, 531))
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
        self.info.addTab(self.camp_tab, "")
        self.donation_tab = QtWidgets.QWidget()
        self.donation_tab.setObjectName("donation_tab")
        self.tabWidget = QtWidgets.QTabWidget(self.donation_tab)
        self.tabWidget.setGeometry(QtCore.QRect(0, 0, 1021, 651))
        self.tabWidget.setObjectName("tabWidget")
        self.tab_2 = QtWidgets.QWidget()
        self.tab_2.setObjectName("tab_2")
        self.pushButton_6 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_6.setGeometry(QtCore.QRect(450, 320, 75, 24))
        self.pushButton_6.setObjectName("pushButton_6")
        self.label_15 = QtWidgets.QLabel(self.tab_2)
        self.label_15.setGeometry(QtCore.QRect(410, 260, 71, 20))
        self.label_15.setObjectName("label_15")
        self.lineEdit_6 = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_6.setGeometry(QtCore.QRect(500, 210, 191, 22))
        self.lineEdit_6.setObjectName("lineEdit_6")
        self.label_14 = QtWidgets.QLabel(self.tab_2)
        self.label_14.setGeometry(QtCore.QRect(430, 390, 231, 20))
        self.label_14.setAlignment(QtCore.Qt.AlignCenter)
        self.label_14.setObjectName("label_14")
        self.lineEdit_5 = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_5.setGeometry(QtCore.QRect(500, 160, 191, 22))
        self.lineEdit_5.setObjectName("lineEdit_5")
        self.label_16 = QtWidgets.QLabel(self.tab_2)
        self.label_16.setGeometry(QtCore.QRect(404, 160, 71, 20))
        self.label_16.setObjectName("label_16")
        self.pushButton_5 = QtWidgets.QPushButton(self.tab_2)
        self.pushButton_5.setGeometry(QtCore.QRect(530, 320, 75, 24))
        self.pushButton_5.setObjectName("pushButton_5")
        self.label_13 = QtWidgets.QLabel(self.tab_2)
        self.label_13.setGeometry(QtCore.QRect(400, 210, 91, 20))
        self.label_13.setObjectName("label_13")
        self.dateEdit_3 = QtWidgets.QDateEdit(self.tab_2)
        self.dateEdit_3.setGeometry(QtCore.QRect(500, 260, 110, 22))
        self.dateEdit_3.setObjectName("dateEdit_3")
        self.tabWidget.addTab(self.tab_2, "")
        self.tab_3 = QtWidgets.QWidget()
        self.tab_3.setObjectName("tab_3")
        self.tableWidget_6 = QtWidgets.QTableWidget(self.tab_3)
        self.tableWidget_6.setGeometry(QtCore.QRect(240, 120, 571, 331))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.MinimumExpanding, QtWidgets.QSizePolicy.MinimumExpanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.tableWidget_6.sizePolicy().hasHeightForWidth())
        self.tableWidget_6.setSizePolicy(sizePolicy)
        self.tableWidget_6.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
        self.tableWidget_6.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)
        self.tableWidget_6.setRowCount(10)
        self.tableWidget_6.setColumnCount(5)
        self.tableWidget_6.setObjectName("tableWidget_6")
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_6.setHorizontalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_6.setHorizontalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_6.setHorizontalHeaderItem(2, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_6.setHorizontalHeaderItem(3, item)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget_6.setHorizontalHeaderItem(4, item)
        self.tabWidget.addTab(self.tab_3, "")
        self.info.addTab(self.donation_tab, "")
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        self.info.setCurrentIndex(0)
        self.tabWidget.setCurrentIndex(0)
        self.login()
        self.tableWidget.cellDoubleClicked['int', 'int'].connect(self.set_camp)
        self.pushButton_6.clicked.connect(self.donation)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.login_btn.setText(_translate("MainWindow", "Login"))
        self.name_5.setText(_translate("MainWindow", "TextLabel"))
        self.h_id_5.setText(_translate("MainWindow", "TextLabel"))
        self.email_5.setText(_translate("MainWindow", "TextLabel"))
        self.phone_5.setText(_translate("MainWindow", "TextLabel"))
        self.adr_5.setText(_translate("MainWindow", "TextLabel"))
        self.lisc_5.setText(_translate("MainWindow", "TextLabel"))
        self.name_6.setText(_translate("MainWindow", "NAME        :"))
        self.h_id_6.setText(_translate("MainWindow", "ID              :"))
        self.email_6.setText(_translate("MainWindow", "EMAIL        : "))
        self.phone_6.setText(_translate("MainWindow", "PHONE       : "))
        self.adr_6.setText(_translate("MainWindow", "ADDRESS   : "))
        self.lisc_6.setText(_translate("MainWindow", "LISCENSE   : "))
        self.info.setTabText(self.info.indexOf(self.Info_tab), _translate("MainWindow", "info"))
        self.label.setText(_translate("MainWindow", "A+"))
        self.label_2.setText(_translate("MainWindow", "A+"))
        self.label_3.setText(_translate("MainWindow", "B+"))
        self.label_4.setText(_translate("MainWindow", "O+"))
        self.info.setTabText(self.info.indexOf(self.bg_tab), _translate("MainWindow", "bg"))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("MainWindow", "CAMP_NAME"))
        item = self.tableWidget.horizontalHeaderItem(1)
        item.setText(_translate("MainWindow", "LOCATION"))
        item = self.tableWidget.horizontalHeaderItem(2)
        item.setText(_translate("MainWindow", "DATE"))
        self.tableWidget_3.setSortingEnabled(False)
        item = self.tableWidget_3.horizontalHeaderItem(0)
        item.setText(_translate("MainWindow", "DONOR_NAME"))
        item = self.tableWidget_3.horizontalHeaderItem(1)
        item.setText(_translate("MainWindow", "PHONE NO."))
        item = self.tableWidget_3.horizontalHeaderItem(2)
        item.setText(_translate("MainWindow", "BLOOD GROUP"))
        item = self.tableWidget_3.horizontalHeaderItem(3)
        item.setText(_translate("MainWindow", "UNITS"))
        self.info.setTabText(self.info.indexOf(self.camp_tab), _translate("MainWindow", "camp"))
        self.pushButton_6.setText(_translate("MainWindow", "Okay"))
        self.label_15.setText(_translate("MainWindow", "Date : "))
        self.label_14.setText(_translate("MainWindow", "TextLabel"))
        self.label_16.setText(_translate("MainWindow", "Phione NO."))
        self.pushButton_5.setText(_translate("MainWindow", "Cancel"))
        self.label_13.setText(_translate("MainWindow", "Units Of Blood"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_2), _translate("MainWindow", "DONATE"))
        item = self.tableWidget_6.horizontalHeaderItem(0)
        item.setText(_translate("MainWindow", "DONOR NAME"))
        item = self.tableWidget_6.horizontalHeaderItem(1)
        item.setText(_translate("MainWindow", "PHONE NO."))
        item = self.tableWidget_6.horizontalHeaderItem(2)
        item.setText(_translate("MainWindow", "BLOOD GROUP"))
        item = self.tableWidget_6.horizontalHeaderItem(3)
        item.setText(_translate("MainWindow", "UNITS OF BLOOD"))
        item = self.tableWidget_6.horizontalHeaderItem(4)
        item.setText(_translate("MainWindow", "DATE"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_3), _translate("MainWindow", "DONOR LIST"))
        self.info.setTabText(self.info.indexOf(self.donation_tab), _translate("MainWindow", "Donations"))

    def login(self):
        global m_url,data

        '''URL= m_url+'/api/bloodbank/login'
        params = {'email' : 'krnak07@gmail.com',#self.email_ip.text(),
            'password' : '1234567' } #self.password_ip.text() }
        r = requests.post(url = URL,data = params)
        data = r.json()



        if(r.status_code == 200):'''
        self.name_5.setText(data['name'])
        self.h_id_5.setText(data['_id'])
        self.email_5.setText(data['email'])
        self.adr_5.setText(data['address'])
        self.lisc_5.setText(data['liscense'])
        self.phone_5.setText(str(data['phoneNo']))

        self.lcdNumber.display(str(data['BloodAvailability'][2]['quantity']))
        self.update_camp()
        self.update_donations()

    def update_camp(self):
        global m_url, data
        URL = m_url + '/api/bloodbank/' + data['_id'] + '/allcamps'
        r = requests.get(url=URL)
        data_camp = r.json()

        for i in range(0, len(data_camp)):
            self.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(data_camp[i]['name']))
            self.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(data_camp[i]['location']))
            self.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(data_camp[i]['dateofhost']))
    def update_donations(self):
        global m_url, data
        URL = m_url + '/api/bloodbank/' + data['_id'] + '/alldonations'
        r = requests.get(url=URL)
        data_donations = r.json()

        if r.status_code == 200:
            k = len(data_donations['donations'])
            for i in range(0, len(data_donations['donations'])):
                k-=1
                self.tableWidget_6.setItem(i, 0, QtWidgets.QTableWidgetItem(data_donations['donations'][k]['donor_name']))
                self.tableWidget_6.setItem(i, 1, QtWidgets.QTableWidgetItem(str(data_donations['donations'][k]['phoneNo'])))
                self.tableWidget_6.setItem(i, 2, QtWidgets.QTableWidgetItem(data_donations['donations'][k]['bloodgroup']))
                self.tableWidget_6.setItem(i, 3, QtWidgets.QTableWidgetItem(str(data_donations['donations'][k]['unitsofblood'])))
                self.tableWidget_6.setItem(i, 4, QtWidgets.QTableWidgetItem(data_donations['donations'][k]['dateofdonation']))





    def set_camp(self,x,y):
        global m_url,data

        for i in range (0,self.tableWidget_3.rowCount()):
            self.tableWidget_3.removeRow(i)

        camp_name = self.tableWidget.item(x,0).text()
        URL = m_url + '/api/bloodbank/' + data['_id'] + '/camps/getone?name='+str(camp_name)
        r = requests.get(url=URL)
        data_camp = r.json()
        k=len(data_camp['campdonor'])
        if(r.status_code == 200):
            for i in range(0,len(data_camp['campdonor'])):
                k-=1
                self.tableWidget_3.setItem(i,0,QtWidgets.QTableWidgetItem(data_camp['campdonor'][k]['donor_name']))
                self.tableWidget_3.setItem(i, 1, QtWidgets.QTableWidgetItem(str(data_camp['campdonor'][k]['phoneNo'])))
                self.tableWidget_3.setItem(i, 2, QtWidgets.QTableWidgetItem(data_camp['campdonor'][k]['bloodgroup']))
                self.tableWidget_3.setItem(i, 3, QtWidgets.QTableWidgetItem(str(data_camp['campdonor'][k]['unitsofblood'])))


    def donation(self):
        global m_url,data
        li = self.lineEdit_5.text()
        if (self.lineEdit_5.text() == '' or ui.lineEdit_6.text() == ''):
            self.label_14.setText('Empty Field')
        else:
            URL = m_url + '/api/donor/check?ph=' + str(li)
            r = requests.get(url=URL)
            data_pro = r.json()
            if r.status_code == 200:
                if data_pro == []:
                    self.label_14.setText('User Not Found!')
                else:
                    URL = m_url+'/api/bloodbank/'+data['_id']+'/donate'
                    params = {'phoneNo' : self.lineEdit_5.text(),
                              'dateofdonation' : self.dateEdit_3.text(),
                              'units' : self.lineEdit_6.text()}
                    r = requests.post(url=URL, data=params)
                    data_up = r.json()
                    self.label_14.setText('Done!')
                    self.update_donations()
            else:
                self.label_14.setText('Error')


if __name__ == "__main__":
    import sys

    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_bMainWindow()
    ui.setupUi(MainWindow,m_url,data)
    MainWindow.show()
    sys.exit(app.exec_())
