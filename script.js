let x = 0
let y = 0
let mole = null
const moleWidth = 50
const moleHeight = 50

let score = 0
let maxPossibleScore = -1
let scoreContainer = null

let time = 40 // seconds
let timeIntervalId = null
let timeContainer = null

let moleRotationInterval = 2 // seconds
let moleRotationIntervalId = null

let moleRotationIntervalIncTime = 10 // seconds
const moleRotationIntervalIncFactor = 0.75

const incMaxPossibleScore = () => {
    maxPossibleScore = maxPossibleScore + 1
    DisplayScore()
}

const makeTimeContainer = () => {
    const div = document.createElement('div')
    
        div.style.position = 'fixed'
        div.style.right = 0 + 'px'
        div.style.top = 0 + 'px'
        div.style.fontFamily = 'sans-serif'
        div.style.fontSize = 25 + 'px'
        
        document.body.appendChild(div)
        timeContainer = div
    }

const displayTime = () => {
    timeContainer.innerText = time + ' sekund'
    if(time >= 52 && time <= 54)timeContainer.innerText = time + ' sekundy'
    if(time >= 42 && time <= 44)timeContainer.innerText = time + ' sekundy'
    if(time >= 32 && time <= 34)timeContainer.innerText = time + ' sekundy'
    if(time >= 22 && time <= 24)timeContainer.innerText = time + ' sekundy'
    if(time >= 2 && time <= 4)timeContainer.innerText = time + ' sekundy'
    if(time === 1)timeContainer.innerText = time + ' sekunda'
}

const speedUp = () => {
    if(time % moleRotationIntervalIncTime !== 0) return
    moleRotationInterval = moleRotationInterval * moleRotationIntervalIncFactor
    startMoleRotationInterval()
}

const decTime = () => {
    time = time - 1
    if(time === 0) endGame()
    speedUp()
    displayTime()
}

const makeScoreContainer = () => {
const div = document.createElement('div')

    div.style.position = 'fixed'
    div.style.left = 0 + 'px'
    div.style.top = 0 + 'px'
    div.style.fontFamily = 'sans-serif'
    div.style.fontSize = 25 + 'px'
    
    document.body.appendChild(div)
    scoreContainer = div
}

const DisplayScore = () => {
scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwek' 
if(score === 1)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwko'  
if(score >= 2 && score <= 4)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
if(score >= 22 && score <= 24)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka' 
if(score >= 32 && score <= 34)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
if(score >= 42 && score <= 44)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'   
if(score >= 52 && score <= 54)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
if(score >= 62 && score <= 64)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
if(score >= 72 && score <= 74)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
if(score >= 82 && score <= 84)scoreContainer.innerText = score + '/' + maxPossibleScore + ' piwka'
}

const incScore = () => {
    score = score + 1
    DisplayScore()
}

const randomizeNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)    
}

const randomizeMolePosition = () => {
    const xMax = window.innerWidth - moleWidth
    const yMax = window.innerHeight - moleHeight

    x = randomizeNumber (0, xMax)
    y = randomizeNumber (0, yMax)

    console.log (xMax, yMax)   
}

const removeMole = () => {
    if(mole === null) return

    mole.remove()
}

const makeMole = () => {
    removeMole()
    incMaxPossibleScore()

    const div = document.createElement('div')

    div.style.width = moleWidth + 'px'
    div.style.height = moleHeight + 'px'
    div.style.backgroundColor = 'whitesmoke'
    div.style.position = 'fixed'
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    div.style.backgroundImage = 'url("./beer.png")'
    div.style.webkitBackgroundSize = 'cover'
    div.style.cursor = 'pointer'

    div.addEventListener(
        'click',
        clickOnMole
    )

    document.body.appendChild(div)
    mole = div
}

const makeNewMole = () => {
    randomizeMolePosition()
    makeMole()
}

const clickOnMole = () => {
    startMoleRotationInterval()
    incScore()
    makeNewMole()
}

const endGame = () => {
    ResetGame()
    alert('Twój wynik to: ' + score)
}

const ResetGame = () => {
    window.location = ('')

}

const startTimeInterval = () => {
    timeIntervalId = setInterval(
        decTime, 
        1000
    )
}

const startMoleRotationInterval = () => {
    stopMoleRotationInterval()
    moleRotationIntervalId = setInterval(
        makeNewMole, 
        moleRotationInterval * 1000 
    )
}

const stopMoleRotationInterval = () => {
    if(moleRotationIntervalId === null)return 
    clearInterval (moleRotationIntervalId)
}

const init = () => {
makeScoreContainer()
DisplayScore()
makeTimeContainer()
displayTime() 
makeNewMole()
startTimeInterval()
startMoleRotationInterval()
}

init()
