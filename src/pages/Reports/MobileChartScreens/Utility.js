export function returnUniqueColorCode() {

    let i = 1

    let flag = true

    while (flag) {

        let temp = '#' + Math.floor(Math.random() * 16777215).toString(16)

        console.log(checkFunc(temp))

        console.log(i)

        if (processColor(temp) != undefined) {



            if (checkFunc(temp)) {



            } else {

                colorObj.current[JSON.stringify(temp)] = 1

                return temp
            }

        }

        if (i > 100) {
            break
        }

        i++

    }
}