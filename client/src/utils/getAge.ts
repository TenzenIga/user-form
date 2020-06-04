

export const getAge = (birthday:Date) => {
    let today = new Date();
    let date = new Date(birthday);
        var age = today.getFullYear() - date.getFullYear();
        var m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }
        return age;
}


export const formatBirthday = (birthday:Date) =>{
    return String(birthday).split('T')[0].split('-').join('.')
}