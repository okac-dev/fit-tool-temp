import { male,female } from './genders.js'

export const getBMI = (userSettings) => {
    let health = null
    let bmi = (parseFloat(userSettings.weight) / Math.pow(parseFloat(userSettings.height) / 100, 2)).toFixed(2)
    if (bmi < 18.5) {
        health = 'Under Weight'
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        health = 'Normal Weight'
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        health = 'Over Weight'
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        health = 'Obesity class I'
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        health = 'Obesity class II'
    } else if (bmi >= 40.0) {
        health = 'Obesity class III'
    }
    // Calculate Ideal Weight
    const data = {
        bmi:parseFloat(bmi),
        health,
        healthy_bmi_range: '18.5-24.9'
    }
    if (health !== null) {
        return data
    }else{
        return {err:'make sure to add all params'}
    }
}

export const getBMR = (userSettingsr) => {
    const { weight: w, height: h, age: a, gender } = userSettingsr
    let bmr = null
    if (gender == 'male') {
        bmr = (66.5 + (13.76 * w) + (5.003 * h) - (6.755 * a))
    } else if (gender == 'female') {
        bmr = (655 + (9.563 * w) + (1.850 * h) - (4.676 * a))
    }

    if(bmr !== null){
        return {bmr,gender:userSettings.gender}
    }else{
        return {err:'make sure to add all params'}
    }
}

export const getIBW = (userSettings) => {
    const { weight: w, height, gender } = userSettings
    //height is in cm
    let robinson, miller, devine, hamwi, h = (height / 2.54)
    if (gender == 'male') {
        robinson = (52 + (1.9 * (h - 60)))
        miller = (56.2 + (1.41 * (h - 60)))
        hamwi = (48 + (2.7 * (h - 60)))
        devine = (50 + (2.3 * (h - 60)))
    } else if (gender == 'female') {
        robinson = (49 + (1.7 * (h - 60)))
        miller = (53.1 + (1.36 * (h - 60)))
        hamwi = (45.5 + (2.2 * (h - 60)))
        devine = (45.5 + (2.3 * (h - 60)))
    }
    return {
        robinson, miller, devine, hamwi,gender:userSettings.gender
    }
}

export const getTDEE = (userSettings) => {
    let bmr = getBMR(userSettings).bmr
    let tdee = null
    switch (userSettings.activitylevel) {
        case 'se':
            tdee = bmr * 1.2
            break
        case 'la':
            tdee = bmr * 1.375
            break
        case 'ma':
            tdee = bmr * 1.55
            break
        case 'va':
            tdee = bmr * 1.725
            break
        case 'ea':
            tdee = bmr * 1.9
            break
        default:
            tdee = bmr * 1
    }
    if (tdee !== null) {
        return { tdee }
    }
}

export const getBFP = (userSettings) => {
    let description = ''
    let bmi = (parseFloat(userSettings.weight) / Math.pow(parseFloat(userSettings.height) / 100, 2)).toFixed(2)
    let bfp = null
    // log(x) && x > 
    if (userSettings.gender == 'male') {
        if(userSettings.age < 14){
            bfp = 1.51 * bmi + 0.70 * userSettings.age - 2.2
        }else{
            // age >=14
            bfp = 1.20 * bmi + 0.23 * userSettings.age - 16.2
        }
        let fat_mass = userSettings.weight * (bfp / 100)
        let lean_mass = userSettings.weight - fat_mass
        if (bfp < 2) {
            return {
                bfp: 0,
                fat_mass: 0,
                lean_mass: userSettings.weight,
                description: 'Less than Essential Fat'
            }
        } else if (bfp >= 2.0 && bfp <= 5.0) {
            description = 'Essential Fat'
        } else if (bfp > 5.0 && bfp <= 13.0) {
            description = 'Athletes'
        } else if (bfp > 13.0 && bfp <= 17.0) {
            description = 'Fitness'
        } else if (bfp > 17.0 && bfp <= 24.0) {
            description = 'Acceptable'
        } else if (bfp > 24.0) {
            description = 'Obese'
        }
        return { bfp:parseFloat(bfp), fat_mass, lean_mass, description,gender:userSettings.gender}
    } else if (userSettings.gender == 'female') {
        if(userSettings.age < 12){
            bfp = 1.51 * bmi + 0.70 * userSettings.age +  1.4
        }else{
            // age >=12
            bfp = 1.20 * bmi + 0.23 * userSettings.age - 5.4
        }
        let fat_mass = userSettings.weight * (bfp / 100)
        let lean_mass = userSettings.weight - fat_mass
        if (bfp < 10) {
            return {
                bfp: 0,
                fat_mass: 0,
                lean_mass: userSettings.weight,
                description: 'Less than Essential Fat'
            }
        } else if (bfp >= 10.0 && bfp <= 13.0) {
            description = 'Essential Fat'
        } else if (bfp >= 14.0 && bfp <= 20.0) {
            description = 'Athletes'
        } else if (bfp > 20.0 && bfp <= 24.0) {
            description = 'Fitness'
        } else if (bfp > 24.0 && bfp <= 31.0) {
            description = 'Acceptable'
        } else if (bfp > 31.0) {
            description = 'Obese'
        }
        return { bfp:parseFloat(bfp), fat_mass, lean_mass, description,gender:userSettings.gender }
    } else {
        return 'error'
    }
}
export const getABSI = (userSettings) => {
    const {weight, height, gender, waist : wc, age} = userSettings
    let bmi = (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(2)
        let absi = ((parseFloat(wc) / 100) / (Math.pow(bmi, 2 / 3) * Math.pow(height / 100, 1 / 2))).toFixed(4)
        // calculate the absi z
        let absiZ = null
        if (gender == 'male') {
            for (let i = 0; i < male.length; i++) {
                if (male[i].age == age) {
                    absiZ = ((absi - male[i].absiMean) / male[i].absiSd).toFixed(4)
                }
            }
        } else if (gender == 'female') {
            for (let i = 0; i < female.length; i++) {
                if (female[i].age == age) {
                    absiZ = ((absi - female[i].absiMean) / female[i].absiSd).toFixed(4)
                }
            }
        }
        //calculate mortality risk
        let mortalityRisk = null
        if(absiZ < -0.868){
            mortalityRisk = 'Very low'
        }else if(absiZ >= -0.868 && absiZ < -0.272) {
            mortalityRisk = 'Low'
        }else if(absiZ >= -0.272 && absiZ < 0.229) {
            mortalityRisk = 'Average'
        }else if(absiZ >= 0.229 && absiZ <= 0.798) {
            mortalityRisk = 'High'
        }else if(absiZ > 0.798){
            mortalityRisk = 'Very High'  
        }
        // mortality risk calculation ends
        const result = { bmi, absi, absiZ,mortalityRisk,gender:userSettings.gender}
        if(absiZ !== null && mortalityRisk !== null){
            return result
        }else{
            return {error:'error'}
        }
}

export const getWHR = (userSettings) => {
    const { gender,waist,hip } = userSettings
    let whr = null,bodyShape = '',riskLevel= ''
    whr = (parseFloat(waist) / parseFloat(hip)).toFixed(3)
        if(gender == 'male') {
            if(whr < 0.90){
                bodyShape = "Pear"
                riskLevel = "Low Health Risk"
            }else if(whr >= 0.90 && whr <= 0.95) {
                bodyShape = "Apple"
                riskLevel = "Moderate Health Risk"
            }else if(whr > 0.95) {
                bodyShape = "Apple"
                riskLevel = "High Health Risk"
            }
        }else if(gender == 'female') {
            if(whr < 0.85){
                bodyShape = "Pear"
                riskLevel = "Low Health Risk"
            }else if(whr >= 0.85 && whr <= 0.90) {
                bodyShape = "Apple"
                riskLevel = "Moderate Health Risk"
            }else if(whr > 0.90) {
                bodyShape = "Apple"
                riskLevel = "High Health Risk"
            }
        }
        if(whr !== null) {
            return {whr,bodyShape,riskLevel,gender:userSettings.gender}
        }else{
            return {err:'make sure to add all params'}
        }
}