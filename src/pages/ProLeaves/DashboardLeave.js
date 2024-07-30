import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import SubTab from '../../components/SubTab'
import ProGeneralInfo from './ProGeneralInfo'
import TeamLeavesDashboard from './TeamLeavesDashboard'
import { COLORS } from '../../Constant/Index'


export default function DashboardLeave(props) {

    const [selectedTab, setselectedTab] = useState(0)


    return (
        <>
            {/* <View style={{ height: 20, backgroundColor: COLORS.FormBGColor }} /> */}
            <View style={{ flex: 1, backgroundColor: COLORS.FormBGColor }}>
            <View style={{ height: 20, backgroundColor: COLORS.FormBGColor }} />
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    {/* <SubTab selectedTab={selectedTab} setselectedTab={setselectedTab} firstTabName='My' secondTabName='Team' /> */}
                </View>
                {/* <View style={{ marginTop: 20 }} /> */}
                { selectedTab == 0 ? <ProGeneralInfo {...props}/> : <TeamLeavesDashboard {...props}/> }  
            </View>
        </> 
    )
}

const styles = StyleSheet.create({})