const data = new Date()
const dataDiv = document.querySelector('#data')

const activeAlarmBtn = document.querySelector('#activeAlarmBtn')
const stopAlarmBtn = document.querySelector('#stopAlarmBtn')
const alarmSecondsInput = document.querySelector('#alarmSecondsInput')
const alarmTimeDisplay = document.querySelector('#alarmTimeDisplay')
const container = document.querySelector('.container')
const display = document.querySelector('.display')

const alarmSound = new Audio('alarm.mp3')
alarmSound.loop = -1

let tsAtual = null
let tsAlarm = null
let activeAlarm = false
let playingAlarm = false

activeAlarmBtn.addEventListener('click', (event) => {
    tsAtual = Date.now()
    tsAlarm = tsAtual + (alarmSecondsInput.value * 1000)

    activeAlarm = true
    const dataAlarm = new Date(tsAlarm)

    let hora = dataAlarm.getHours() < 10 ? `0${dataAlarm.getHours()}` : dataAlarm.getHours()
    let minuto = dataAlarm.getMinutes() < 10 ? `0${dataAlarm.getMinutes()}` : dataAlarm.getMinutes()
    let segundo = dataAlarm.getSeconds() < 10 ? `0${dataAlarm.getSeconds()}` : dataAlarm.getSeconds()

    alarmTimeDisplay.innerHTML = `Hora do Alarme: ${hora}:${minuto}:${segundo}`
})

stopAlarmBtn.addEventListener('click', (event) => {
    activeAlarm = false
    playingAlarm = false

    alarmTimeDisplay.innerHTML = 'Hora do Alarme:'

    alarmSecondsInput.value = 0

    container.classList.remove('alarm')
    display.classList.remove('alarmDisplay')
    relogioDiv.classList.remove('alarmDisplay')

    alarmSound.pause()
    alarmSound.currentTime = 0
})

// Formatação Data

const dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()
const mes = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1 // O primeiro mês possui o valor {0}
const ano = data.getFullYear()

const dataFormatada = `${dia}/${mes}/${ano}` // Formatação: xx/xx/xxxx

dataDiv.innerHTML = dataFormatada

// Formatação Relógio

const relogioDiv = document.querySelector('#relogio')

const relogio = () => {
    const relogio = new Date()
    let hora = relogio.getHours() < 10 ? `0${relogio.getHours()}` : relogio.getHours()
    let minuto = relogio.getMinutes() < 10 ? `0${relogio.getMinutes()}` : relogio.getMinutes()
    let segundo = relogio.getSeconds() < 10 ? `0${relogio.getSeconds()}` : relogio.getSeconds()

    let relogioFormatado = `${hora}:${minuto}:${segundo}`
    relogioDiv.innerHTML = relogioFormatado

    if(activeAlarm && !playingAlarm){
        if(relogio.getTime() >= tsAlarm){
            playingAlarm = true
            alarmSound.play()
            container.classList.add('alarm')
            display.classList.add('alarmDisplay')
            relogioDiv.classList.add('alarmDisplay')
        }
    }
}

const intervalo = setInterval(relogio, 1000)