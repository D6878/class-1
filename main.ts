function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 51)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
function Hard_left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 0)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
function Obstacle () {
    while (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function soft_left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
}
function turn () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
}
function soft_right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
}
function all_ahead () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
}
let left_turn = 0
let IRR = 0
let IRL = 0
while (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
    maqueen.motorStop(maqueen.Motors.All)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
        Obstacle()
    }
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    IRR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (IRL == 0 && IRL == 0) {
        all_ahead()
    } else if (IRL == 0) {
        soft_left()
        left_turn = 1
    } else if (IRR == 0) {
        soft_right()
        left_turn = 0
    } else {
        if (left_turn) {
            soft_right()
        } else {
            soft_left()
        }
    }
})
