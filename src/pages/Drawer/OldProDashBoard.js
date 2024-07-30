<ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{}}>
            {/* Leave Card View*/}
            <View style={styles.cardView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 15,
                  marginRight: 10,
                  justifyContent: 'space-between'
                }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Image
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    source={require('../../images/leave.png')}></Image>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratSemiBold,
                      fontSize: 14,
                      padding: 8,
                    }}>
                    Leave Summary
                  </Text>
                </View>
                <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
                  startColor={arrowShadowColor}
                // finalColor='#9b9aed' 
                // corners={'bottomRight'}
                >
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('LeaveTab') }} style={styles.arrowBtn
                  } >

                    <Image
                      style={styles.arrowBtnImg}
                      source={require('../../images/downArrow.png')}></Image>

                  </TouchableOpacity>
                </Shadow>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <ScrollView
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {leaveArr.map((subItem, index) => (
                    <View
                      style={{ alignItems: 'center', width: 95.33 }}
                      key={index}>
                      <View
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 30,
                          borderWidth: 2,
                          borderColor: 'rgba(229,229,229,1.0)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: '#181818',
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 12,
                            padding: 2,
                          }}>
                          {subItem.remainLeave}
                          {' / '}
                          {subItem.totalLeave}{' '}
                        </Text>
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#181818',
                          fontFamily: Constant.MontserratSemiBold,
                          fontSize: 11,
                          padding: 8,
                        }}
                        numberOfLines={1}>
                        {subItem.leaveName}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#f2f2f2',
                  height: 25,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: 12,
                }}
                onPress={() => this.props.navigation.navigate('LeaveTab')}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratBold,
                    color: '#2b66b6',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
            </View>

            {/* Expense Card */}

            <View style={styles.cardView}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 15,
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Image
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    source={require('../../images/expenses.png')}></Image>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratSemiBold,
                      fontSize: 14,
                      padding: 8,
                    }}>
                    Expenses
                  </Text>
                </View>
                <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
                  startColor={arrowShadowColor}
                // finalColor='#9b9aed' 
                // corners={'bottomRight'}
                >
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProExpenseTab') }} style={styles.arrowBtn
                  } >

                    <Image
                      style={{ height: 15, width: 15, resizeMode: 'contain', transform: [{ rotate: '270deg' }], tintColor: '#808080' }}
                      source={require('../../images/downArrow.png')}></Image>

                  </TouchableOpacity>
                </Shadow>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <ScrollView
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {expenseArr.length != 0 ? (
                    expenseArr.map((item, index) => (
                      <View
                        style={{ alignItems: 'center', width: 95.33 }}
                        key={index}>
                        <View
                          style={{ height: 60, width: 60, flexDirection: 'row' }}>
                          <View
                            style={
                              item.status == 'APPROVED'
                                ? {
                                  height: 56,
                                  width: 56,
                                  borderRadius: 30,
                                  borderWidth: 2,
                                  borderColor: 'rgba(94,184,45,1.0)',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }
                                : item.status == 'REJECTED'
                                  ? {
                                    height: 60,
                                    width: 60,
                                    borderRadius: 30,
                                    borderWidth: 2,
                                    borderColor: 'rgba(250,52,53,1.0)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }
                                  : {
                                    height: 60,
                                    width: 60,
                                    borderRadius: 30,
                                    borderWidth: 2,
                                    borderColor: 'rgba(240,193,45,1.0)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }
                            }>
                            <Text
                              allowFontScaling={false}
                              style={
                                item.status == 'APPROVED'
                                  ? {
                                    color: 'rgba(94,184,45,1.0)',
                                    fontFamily: Constant.MontserratSemiBold,
                                    fontSize: 12,
                                  }
                                  : item.status == 'REJECTED'
                                    ? {
                                      color: 'rgba(250,52,53,1.0)',
                                      fontFamily: Constant.MontserratSemiBold,
                                      fontSize: 12,
                                    }
                                    : {
                                      color: 'rgba(240,193,45,1.0)',
                                      fontFamily: Constant.MontserratSemiBold,
                                      fontSize: 12,
                                    }
                              }>
                              {item.reimbursement}
                            </Text>
                          </View>

                          <Image
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: 'contain',
                              top: 23,
                              right: 6,
                            }}
                            source={
                              item.status == 'APPROVED'
                                ? require('../../images/verified.png')
                                : item.status == 'REJECTED'
                                  ? require('../../images/remove.png')
                                  : require('../../images/pending.png')
                            }></Image>
                        </View>

                        <Text
                          allowFontScaling={false}
                          style={{
                            color: '#181818',
                            fontFamily: Constant.MontserratSemiBold,
                            fontSize: 11,
                            padding: 8,
                          }}
                          numberOfLines={1}>
                          {item.reportTitle}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        width: 280,
                        height: 75,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{ height: 40, width: 40, resizeMode: 'contain' }}
                        source={require('../../images/noDataFound.png')}></Image>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#999999',
                          fontFamily: Constant.MontserratRegular,
                          fontSize: 12,
                          paddingTop: 8,
                        }}
                        numberOfLines={1}>
                        No Expense Found.
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </View>

              {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#f2f2f2',
                  height: 25,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: 12,
                }}
                onPress={() => this.props.navigation.navigate('ProExpenseTab')}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: Constant.MontserratBold,
                    color: '#2b66b6',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
            </View>

            {/* Attendance View */}

            <View style={styles.cardView}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Image
                    style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    source={require('../../images/attendance.png')}></Image>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: Constant.MontserratSemiBold,
                      fontSize: 14,
                      padding: 8,
                    }}>
                    Attendance
                  </Text>
                </View>

                <Shadow distance={4} containerViewStyle={styles.arrowBtnShadow} offset={[0.2, 2]}
                  startColor={arrowShadowColor}
                // finalColor='#9b9aed' 
                // corners={'bottomRight'}
                >
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('AttendanceTab') }} style={styles.arrowBtn
                  } >

                    <Image
                      style={styles.arrowBtnImg}
                      source={require('../../images/downArrow.png')}></Image>

                  </TouchableOpacity>
                </Shadow>

              </View>

              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ marginBottom: 20 }}>
                {attendanceArr.map((item, index) => (
                  <View
                    style={{
                      height: 35,
                      width: 260,
                      flexDirection: 'row',
                      margin: 3,
                      alignSelf: 'center',
                    }}
                    key={index}>
                    <View style={{ marginTop: 2 }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 11,
                          width: 100,
                        }}>
                        {item.day}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratRegular,
                          fontSize: 10,
                          color: 'gray',
                          paddingTop: 4,
                          width: 100,
                        }}
                        numberOfLines={1}>
                        {item.date}
                      </Text>
                    </View>
                    <View style={{ marginTop: 2 }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 11,
                          width: 80,
                          textAlign: 'center',
                        }}>
                        In
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratRegular,
                          fontSize: 10,
                          color: 'gray',
                          paddingTop: 4,
                          width: 80,
                          textAlign: 'center',
                        }}>
                        {item.punchIn}
                      </Text>
                    </View>
                    <View style={{ marginTop: 2 }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratMedium,
                          fontSize: 11,
                          width: 80,
                        }}>
                        Out
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: Constant.MontserratRegular,
                          fontSize: 10,
                          color: 'gray',
                          paddingTop: 4,
                          width: 80,
                        }}>
                        {' '}
                        {item.punchOut}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>