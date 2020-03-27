export const validate = (values) => {

    const errors = {}

    const requiredFields = [
        'title', 'text', 'description', 'price','company',
        'companyName', 'companyAddress', 'companyPhone', 'companyEmail',
        'email', 'password','firstName', 'lastName', 'confPassword', 'password'
    ]

    const requiredPhones = ['companyPhone', 'phone01', 'phone02',
        'phone03', 'phone04', 'phone05', 'phone']

    const requiredMails = ['companyEmail', 'email']

    const requiredDigits = ['price']

    const reqPassword = ['password']

    const confPassword = ['confPassword']

    const minLengthPassword = ['userPassword', 'confPassword', 'password']

    const maxLengthField = ['title', 'description','company',
        'companyName', 'companyAddress', 'password','firstName', 'lastName',
        'confPassword', 'password', 'phoneOwner01', 'phoneOwner02'
        , 'phoneOwner03', 'phoneOwner04', 'phoneOwner05']

    const maxLengthText = ['text']

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field]  = 'Обязательное поле'
        }
    })

    requiredPhones.forEach(phone => {
        if (values[phone] &&
            !/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/i.test(values[phone])) {
            errors[phone] = 'Не верный формат телефона'
        }
    })

    requiredMails.forEach(mail => {
        if (values[mail] &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values[mail])) {
            errors[mail] = 'Не верный формат электронной почты'
        }
    })

    requiredDigits.forEach(digit => {
        if (values[digit] &&
            !/^\d+$/i.test(values[digit])) {
            errors[digit] = 'Только цифры'
        }

        if(values[digit] && values[digit].length > 6)
            errors[digit] = 'Сумма превышает допустимы размер'
    })

    if(values[reqPassword] !== values[confPassword])
        errors[confPassword] = "Пароли не совпадают"

    minLengthPassword.forEach(length =>{
        if(values[length] && values[length].length < 8)
            errors[length] = 'Длина пароля должная быть не менее 8 символов'
    })

    maxLengthField.forEach(length =>{
        if(values[length] && values[length].length > 255)
            errors[length] = 'Длина должная быть не более 255 символов'
    })

    maxLengthText.forEach(length =>{
        if(values[length] && values[length].length > 5000)
            errors[length] = 'Длина должная быть не более 5000 символов'
    })

    return errors
}