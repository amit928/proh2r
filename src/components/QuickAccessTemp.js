const quickAccessImagesArr = {

    "ApplyLeave": require(`../images/appLeave.png`),
    "AddExpense": require(`../images/appExp.png`),
    "ApplyRegularization": require(`../images/appReg.png`),
    "ApplySeperation": require(`../images/appSep.png`),
    "TeamLeaves": require(`../images/teamLeavesFav.png`),
    "TeamExpense": require(`../images/teamExpenseFav.png`),
    "TeamRegularization": require(`../images/teamRegFav.png`)

}

let quickAccessMasterListTemp = [
    {
        name: "Apply Leave",
        screenKey: "ApplyLeave",
        bgcolor: '#C3F0FF',
        borderColor: '#92E2FF',
        textColor: '#025F80',
        image: "ApplyLeave",
        isPayload: true,
        payload: { refreshList: () => { }, isEdit: '0' },
        
    },
    {
        name: "Add Expense",
        screenKey: "ProAddExpense",
        bgcolor: '#FFDFC9',
        borderColor: '#FFC5A6',
        textColor: '#624434',
        image: "AddExpense",
        isPayload: false,
        payload: {}
    },
    {
        name: "Apply\nRegularization",
        screenKey: "AttendanceTab",
        bgcolor: '#FFDCDE',
        borderColor: '#FFC5C9',
        textColor: '#F12332',
        image: "ApplyRegularization",
        isPayload: true,
        payload: { "tabIndex": 1, "openApplyReg": true }
    },
    {
        name: "Apply\nSeperation",
        screenKey: "ProSeperationTab",
        bgcolor: '#D9FFDA',
        borderColor: '#91F896',
        textColor: '#1D8522',
        image: "ApplySeperation",
        isPayload: true,
        payload: { "tabIndex": 0, "openApplyReg": true }
    }
]




if (leaveSupervisor) {
    quickAccessMasterListTemp.push({
        name: "Team Leaves",
        screenKey: "LeaveTab",
        bgcolor: '#EFE4FF',
        borderColor: '#D9C2F9',
        textColor: '#685C79',
        image: "TeamLeaves",
        isPayload: true,
        payload: { "tabIndex": 4, "openApplyReg": false }
    })
}



if (expenseSupervisor) {
    quickAccessMasterListTemp.push({
        name: "Team Expense",
        screenKey: "ProExpenseTab",
        bgcolor: '#FFEFD6',
        borderColor: '#FFD699',
        textColor: '#FFB74D',
        image: "TeamExpense",
        isPayload: true,
        payload: { "tabIndex": 1, "openApplyReg": false }
    })
}



if (attdSupervisor) {
    quickAccessMasterListTemp.push({
        name: "Team\nRegularization",
        screenKey: "AttendanceTab",
        bgcolor: '#D5FFE1',
        borderColor: '#A9E6BA',
        textColor: '#317F46',
        image: "TeamRegularization",
        isPayload: true,
        payload: { "tabIndex": 2, "openApplyReg": false }
    })
}