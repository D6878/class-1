function Update_IRR () {
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    IRR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    Ultra = maqueen.Ultrasonic(PingUnit.Centimeters)
}
function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 51)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 51)
    basic.pause(450)
    maqueen.motorStop(maqueen.Motors.All)
}
function Hard_left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    basic.pause(450)
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
function Location () {
    basic.pause(50)
    while (IRL == 0 && IRR == 0) {
        maqueen.motorStop(maqueen.Motors.All)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        Update_IRR()
    }
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
}
function Avoid () {
    avoiding = 1
    Ultra = 0
    avoid_called = 1
    Hard_Right()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    basic.pause(300)
    while (avoiding == 1) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding = 0
            Hard_Right()
        } else {
            if (Ultra) {
                Hard_Right()
            }
            counter = 0
            while (counter < 30 && IRL + IRR == 2) {
                music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
                all_ahead()
                counter += 1
            }
            if (IRL + IRR == 2) {
                Update_IRR()
                Hard_left()
            }
            if (maqueen.Ultrasonic(PingUnit.Centimeters) < 20) {
                Ultra = 1
            } else {
                Ultra = 0
            }
        }
    }
}
function all_ahead () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
}
let counter = 0
let avoiding = 0
let Ultra = 0
let IRR = 0
let IRL = 0
let avoid_called = 0
while (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
    maqueen.motorStop(maqueen.Motors.All)
}
basic.showIcon(IconNames.Butterfly)
avoid_called = 0
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
        if (avoid_called == 0) {
            Avoid()
        } else {
            Location()
        }
    }
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    IRR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (IRL == 0 && IRL == 0) {
        all_ahead()
    } else if (IRL == 0) {
        soft_left()
        avoiding = 1
    } else if (IRR == 0) {
        soft_right()
        avoiding = 0
    } else {
        if (avoiding) {
            soft_right()
        } else {
            soft_left()
        }
    }
})
