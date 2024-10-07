namespace SpriteKind {
    export const DashPlr = SpriteKind.create()
    export const EnemyProjectile1 = SpriteKind.create()
    export const EnemyProjectile2 = SpriteKind.create()
    export const nothing = SpriteKind.create()
    export const hitParticle = SpriteKind.create()
}
sprites.onCreated(SpriteKind.EnemyProjectile2, function (sprite) {
    sprite.setFlag(SpriteFlag.DestroyOnWall, true)
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
    timer.after(5000, function () {
        sprites.destroy(sprite)
    })
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameStarted) {
        if (!(DodgeCooldown)) {
            music.play(music.createSoundEffect(WaveShape.Triangle, 811, 1, 255, 0, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            DodgeCooldown = true
            controller.moveSprite(mySprite, 175, 175)
            InDodge = true
            animation.runImageAnimation(
            mySprite,
            assets.animation`myAnim7`,
            100,
            true
            )
            for (let index = 0; index < 3; index++) {
                mySprite2 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . 1 . . . . 1 . . . . . 
                    . . . . . 1 1 . . 1 1 . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . . 1 1 1 1 . . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . . . . 1 1 1 1 1 1 1 . . . . . 
                    . 1 . 1 1 1 1 1 1 1 1 1 . . . . 
                    1 . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    1 . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                    . 1 . 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 . . 1 1 1 . 1 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.DashPlr)
                animation.runImageAnimation(
                mySprite2,
                assets.animation`myAnim7`,
                100,
                true
                )
            }
            controller.moveSprite(mySprite, 75, 75)
            InDodge = false
            animation.runImageAnimation(
            mySprite,
            assets.animation`myAnim6`,
            75,
            true
            )
            timer.after(500, function () {
                DodgeCooldown = false
            })
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile1, function (sprite, otherSprite) {
    if (!(InDodge) && !(HitInv)) {
        HurtPlayer()
        sprites.destroy(otherSprite)
        HitInv = true
        pause(500)
        HitInv = false
    }
})
sprites.onCreated(SpriteKind.DashPlr, function (sprite) {
    sprite.setPosition(mySprite.x, mySprite.y)
    for (let index = 0; index <= 7; index++) {
        sprite.setScale((7 - index) / 5, ScaleAnchor.Middle)
        pause(12)
    }
    sprites.destroy(sprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameStarted) {
        if (!(AttackCooldown)) {
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            AttackCooldown = true
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 2 2 2 . . . . . 
                . . . . . 2 2 2 2 2 2 2 . . . . 
                . . . 2 2 2 2 2 2 2 2 2 9 9 . . 
                . . 2 2 2 2 2 9 9 9 9 9 9 9 9 . 
                . . 2 2 2 2 2 9 9 9 9 9 9 9 9 . 
                . . 2 2 2 2 2 2 9 9 9 9 9 9 9 . 
                . . 2 2 2 2 2 2 2 9 9 9 9 . . . 
                . . 2 2 2 2 2 2 2 2 2 2 . . . . 
                . . 2 2 2 2 2 2 2 2 2 2 . . . . 
                . . . 2 2 2 2 2 . 2 2 2 . . . . 
                . . . . 2 2 2 2 . 2 2 2 . . . . 
                . . . . 2 2 2 2 . . 2 2 . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, 0, -100)
            animation.runImageAnimation(
            projectile,
            assets.animation`myAnim1`,
            35,
            false
            )
            timer.after(50, function () {
                AttackCooldown = false
            })
        }
    } else {
        StartGame()
        GameStarted = true
    }
})
sprites.onCreated(SpriteKind.EnemyProjectile1, function (sprite) {
    sprite.setFlag(SpriteFlag.DestroyOnWall, true)
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
    timer.after(3000, function () {
        sprites.destroy(sprite)
    })
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    scene.cameraShake(1, 100)
    info.changeScoreBy(5)
    AttackSpeed = info.score() * 0.03
    if (100 < AttackSpeed) {
        AttackSpeed = 100
    }
    mySprite4 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.hitParticle)
    mySprite4.x = otherSprite.x
    mySprite4.y = otherSprite.y
    animation.runImageAnimation(
    mySprite4,
    assets.animation`bulletBoom`,
    50,
    false
    )
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile2, function (sprite, otherSprite) {
    if (InDodge && !(HitInv)) {
        HurtPlayer()
        sprites.destroy(otherSprite)
        HitInv = true
        pause(500)
        HitInv = false
    }
})
sprites.onCreated(SpriteKind.hitParticle, function (sprite) {
    timer.after(200, function () {
        sprites.destroy(mySprite4)
    })
})
info.onLifeZero(function () {
    game.gameOver(false)
})
function StartGame () {
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    scroller.scrollBackgroundWithSpeed(-10, 0)
    AttackCooldown = false
    DodgeCooldown = false
    HitInv = false
    info.setLife(3)
    info.setScore(0)
    mySprite = sprites.create(assets.image`Char`, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim6`,
    75,
    true
    )
    mySprite.setStayInScreen(true)
    controller.moveSprite(mySprite, 75, 75)
    mySprite.setPosition(80, 110)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    sprites.destroy(startScreen)
    TheBoss = sprites.create(assets.image`myImage1`, SpriteKind.Enemy)
    animation.runImageAnimation(
    TheBoss,
    assets.animation`DefaultBoss`,
    200,
    true
    )
    TheBoss.setPosition(0, 10)
    timer.background(function () {
        followythingy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.nothing)
        followythingy.setPosition(0, 0)
        TheBoss.follow(followythingy, 30)
        TheBoss.setPosition(30, 15)
        while (0 < info.life()) {
            followythingy.setPosition(130, 20)
            pause(3300)
            followythingy.setPosition(30, 20)
            pause(3300)
        }
    })
}
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    sprite.setFlag(SpriteFlag.DestroyOnWall, true)
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
    timer.after(3000, function () {
        sprites.destroy(sprite)
    })
})
function HurtPlayer () {
    info.changeLifeBy(-1)
    scene.cameraShake(5, 250)
    music.play(music.createSoundEffect(WaveShape.Noise, 348, 98, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
}
let mySprite3: Sprite = null
let rngAttack = 0
let followythingy: Sprite = null
let TheBoss: Sprite = null
let mySprite4: Sprite = null
let AttackSpeed = 0
let projectile: Sprite = null
let AttackCooldown = false
let HitInv = false
let mySprite2: Sprite = null
let InDodge = false
let mySprite: Sprite = null
let DodgeCooldown = false
let GameStarted = false
let startScreen: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff33fffffffffffffffffffffffffffffffff33fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff333ffffffffffff3333fffff3333fffffff333fffffff333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff333ffffffffffff3333333333333ffffff3333fffffff3333fffffff3333ff3333333333ffffffffffff2222222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff333ffffffffffff3333333333333fffff33333fffffff33333ffffff3333ff3333333333333fffffffff222222222222fff2222fff2222ffffffffffffffffffffffffffffffffffffffffffffffff
    ff333ffffffffffffff3333333333ffffff3333fffffffff3333fffff33333ff3333333333333ffffffff2222222222222fff22222222222fffffffff22222ffffffffffffffffffffffffffffffffff
    ff333ffffffffffffffffff333ffffffff33333fffffffff3333fffff3333fffffff333333333fffffff22222ff2222222fff22222222222ffffffff2222222fffff222fffff222fffffffffffffffff
    ff3333fffffffffffffffff333ffffffff3333fffffffffff333ffff3333fffffff3333fffffffffffff22222fffffffffffff222222222ffffffff22222222fffff222fffff2222fff2222fffffffff
    ff3333fffffffffffffffff333ffffffff333ffffffffffff3333fff3333fffffff3333fffffffffffff2222ffffffffffffffffff222fffffffff222222ffffffff2222ffff2222fff2222222222fff
    ff3333fffffffffffffffff333fffffff3333ff33333fffff3333fff3333fffffff333fffffffffffff2222fffffffffffffffffff222fffffffff22222fffffffff2222ffff222ffff22222222222ff
    fff333fffffffffffffffff333fffffff3333f3333333fffff333fff333ffffffff333fffffffffffff2222ffffffffffffffffff2222ffffffff22222fffffffffff222ffff222fffff2222222222ff
    fff333fffffffffffffffff333fffffff333ff3333333fffff333fff333ffffffff333fffffffffffff22222222222fffffffffff2222ffffffff2222ffffffffffff222ffff222ffffffff222ffffff
    fff333fffffffffffffffff333fffffff333ff3333333fff33333333333333fffff333fffffffffffff22222222222222ffffffff2222ffffffff2222ffffffffffff222ffff222ffffffff222ffffff
    fff333fffffffffffffffff333fffffff333ff333f333fff33333333333333fffff333fffffffffffff22222222222222ffffffff222fffffffff222fffffffffffff2222fff222ffffffff222ffffff
    fff3333ffffffffffffffff3333fffff3333ffffff333fff33333333333333fffff333fffffffffffff222222ff222222ffffffff222ffffffff2222fffffffffffff2222fff222ffffffff222ffffff
    fff3333ffffffffffffffff3333fffff3333ffffff333ffff3333fff3333fffffff333ffffffffffff2222fffffffffffffffffff222ffffffff2222ffffffffffffff222fff222ffffffff222ffffff
    fff3333ffffffffffffffff3333fffff3333fffff3333ffff333fffff333fffffff333ffffffffffff2222fffffffffffffffffff222ffffffff222fffffffffffff2222222f222ffffffff222ffffff
    ffff333fffffffffffffffff333fffff3333fffff3333ffff333fffff333fffffff3333fffffffffff222ffffffffffffffffffff222ffffffff222ffff22222ffff22222222222ffffffff222ffffff
    ffff3333ffffffffffffffff333fffff3333ffff3333fffff333fffff3333ffffff3333fffffffffff2222fffffffffffffffffff2222fffffff222fff2222222fff22222222222222fffff2222fffff
    ffff3333ffffffffffffffff3333333f33333f333333fffff333fffff3333ffffff3333fffffffffff2222fffffffffffffffffff2222fffffff222fff2222222fffff222222222222fffff2222fffff
    ffff3333333333333ffff3333333333ff3333333333ffffff333fffff3333fffffff333fffffffffff2222fffffffffffffffffff2222fffffff2222ff22222222ffff222fff222222fffff2222fffff
    fffff333333333333ff333333333333ff3333333333ffffff333ffffff3333ffffff333ffffffffffff222ffffffffffffffffffff222fffffff2222ffffff2222ffff222fff222fffffffff222fffff
    fffff333333333333ff33333333f333fff333333ffffffff3333ffffff3333ffffff3333fffffffffff222ffffffffffffffffffff222ffffffff2222fffff2222ffff222fff222fffffffff222fffff
    fffff33333ffff333ff3333fffffffffffffffffffffffff3333ffffff3333ffffff3333fffffffffff222fffffffffffffff22222222222fffff2222fffff2222fff2222fff222fffffffff222fffff
    ffffffffffffffffffffffffffffffffffffffffffffffff333ffffffff333fffffff33fffffffffffff22fffffffffffffff2222222222222fff222222ff2222ffff2222fff222fffffffff222fffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222222222222ffff22222222222ffff2222fff2222ffffffff222fffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22222fffff2222222222ffff222ffff2222ffffffff222fffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff22222222fffff222fffff222ffffffff222fffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222fffff222ffffffff222fffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff222fffff22fffffffff222fffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff555555ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffff5ffff55fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff555ffffffffffffffffffffffffffffffffffffffff55ffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff5f5fffffffffffffffffffffffffffffffffffffffff5ffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff5f55ffffffffffffffffffffffffffffffffffffffff5fff55fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff5555555ffffffffffffffffffffffffffffffffffffff55555fffff111fff1fffff11fff1ff11fff11ff11ffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff5ff55ffff111fff1fffff111f1ff11ff11ffffffffff5fff555ffff1fff1f1ffff1f1f1f1f1f1f1ffff1fffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff55fff5fffff1fff1f1ffff1fff1ff1f1f1fffffffffff5fffff5ffff1fff1f1ffff1f1f1f1f1f1f1f1ff11ffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff5ffff5fffff1fff1f1ffff111f1ff11ff11ffffffffff5ffff55ffff1fff1f1ffff1f1f1f1f1f1f1ff1f1fffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff5ffff5fffff1fff1f1ffff1fff1ff1f1f1fffffffffff5fff55fffff1ffff1fffff11fff1ff11fff11ff11ffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff55ffff5fffff1ffff1fffff1fff1ff1f1f11ffffffffff55555ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff55555555ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff555555555fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffff11ff1ff111fff11fff1ff11fff11ff11fff222f222f22fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff1fff1f1f1f1fff1f1f1f1f1f1f1ffff1ffff2f2f2fff2f2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff1fff111f1f1fff1f1f1f1f1f1f1f1ff11fff22ff222f2f2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff1fff1f1f1f1fff1f1f1f1f1f1f1ff1f1ffff2f2f2fff2f2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffff11f1f1f1f1fff11fff1ff11fff11ff11fff2f2f222f22fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff11fff1ff111f111fff11fff1ff11fff11ff11fff99ff9fff9f9f999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff1f1f1f1f1f1ff1ffff1f1f1f1f1f1f1ffff1ffff9f9f9fff9f9f9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff1f1f1f1f1f1ff1ffff1f1f1f1f1f1f1f1ff11fff99ff9fff9f9f999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff1f1f1f1f1f1ff1ffff1f1f1f1f1f1f1ff1f1ffff9f9f9fff9f9f9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff11fff1ff1f1ff1ffff11fff1ff11fff11ff11fff99ff999f999f999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1fff1ff1ff1fff1f1fff111f1f1f11ff1f1fff99ff9fff9f9f999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1fff1f1f1f1fff1f1ffff1ff1f1f1f1f1f1fff9f9f9fff9f9f9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1f1f1f111f1fff11fffff1ff111f11ff1f1fff99ff9fff9f9f999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1f1f1f1f1f1fff1f1ffff1ff1f1f1f1f1f1fff9f9f9fff9f9f9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff1f1ff1f1f111f1f1ffff1ff1f1f1f1f111fff99ff999f999f999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
startScreen = sprites.create(assets.image`myImage0`, SpriteKind.Player)
startScreen.setPosition(80, 85)
startScreen.setScale(2, ScaleAnchor.Middle)
let ssVis = false
while (!(GameStarted)) {
    if (ssVis) {
        ssVis = false
        startScreen.setPosition(80, 150)
    } else {
        ssVis = true
        startScreen.setPosition(80, 100)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    }
    pause(1000)
}
forever(function () {
    if (GameStarted) {
        pause(1500 - AttackSpeed * 13)
        rngAttack = randint(0, 4)
        if (rngAttack == 0) {
            for (let index = 0; index < 5; index++) {
                pause(150)
                music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
                animation.runImageAnimation(
                TheBoss,
                assets.animation`myAnim8`,
                75,
                false
                )
                mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.EnemyProjectile1)
                animation.runImageAnimation(
                mySprite3,
                assets.animation`myAnim2`,
                40,
                false
                )
                mySprite3.setPosition(TheBoss.x, TheBoss.y)
                mySprite3.setVelocity(mySprite.x - mySprite3.x, mySprite.y - mySprite3.y)
                mySprite3.setScale(randint(0.5, 0.6), ScaleAnchor.Middle)
            }
        } else if (rngAttack == 1) {
            animation.runImageAnimation(
            TheBoss,
            assets.animation`myAnim8`,
            75,
            false
            )
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
            for (let index = 0; index <= 4; index++) {
                mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.EnemyProjectile1)
                animation.runImageAnimation(
                mySprite3,
                assets.animation`myAnim2`,
                40,
                false
                )
                mySprite3.setPosition(TheBoss.x, TheBoss.y)
                mySprite3.setVelocity(mySprite.x - mySprite3.x + 10 * (index - 2), mySprite.y - mySprite3.y - Math.abs(5 * (index - 2)))
                mySprite3.setScale(randint(0.5, 0.6), ScaleAnchor.Middle)
            }
        } else if (rngAttack == 2) {
            if (AttackSpeed >= 10) {
                music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
                animation.runImageAnimation(
                TheBoss,
                assets.animation`myAnim8`,
                75,
                false
                )
                for (let index = 0; index <= 16; index++) {
                    mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.EnemyProjectile1)
                    animation.runImageAnimation(
                    mySprite3,
                    assets.animation`myAnim2`,
                    40,
                    false
                    )
                    mySprite3.setPosition(index * 10, 0)
                    mySprite3.setVelocity(0, 50)
                    mySprite3.setScale(randint(0.5, 0.6), ScaleAnchor.Middle)
                }
                pause(1000 - AttackSpeed * 6)
            }
        } else if (rngAttack == 3) {
            if (AttackSpeed >= 5) {
                for (let index = 0; index <= 20; index++) {
                    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
                    pause(100 - AttackSpeed * 0.5)
                    animation.runImageAnimation(
                    TheBoss,
                    assets.animation`myAnim8`,
                    75,
                    false
                    )
                    mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.EnemyProjectile1)
                    animation.runImageAnimation(
                    mySprite3,
                    assets.animation`myAnim2`,
                    40,
                    false
                    )
                    mySprite3.setPosition(TheBoss.x, TheBoss.y)
                    mySprite3.setVelocity(10 * (index - 10), -5 * (Math.abs(1 * index - 10) - 10))
                    mySprite3.setScale(randint(0.5, 0.6), ScaleAnchor.Middle)
                }
            }
        } else {
            if (AttackSpeed >= 25) {
                music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
                animation.runImageAnimation(
                TheBoss,
                assets.animation`myAnim8`,
                75,
                false
                )
                mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.EnemyProjectile1)
                animation.runImageAnimation(
                mySprite3,
                assets.animation`myAnim3`,
                50,
                false
                )
                mySprite3.setPosition(TheBoss.x, TheBoss.y)
                mySprite3.setScale(randint(0.7, 0.8), ScaleAnchor.Middle)
                mySprite3.follow(mySprite, 50)
            }
        }
        if (20 < AttackSpeed) {
            mySprite3 = sprites.create(assets.image`myImage2`, SpriteKind.EnemyProjectile2)
            animation.runImageAnimation(
            mySprite3,
            assets.animation`myAnim`,
            100,
            true
            )
            mySprite3.setPosition(randint(15, 145), 0)
            mySprite3.setVelocity(0, 50)
            mySprite3.setScale(randint(2, 2.25), ScaleAnchor.Middle)
        }
        timer.after(300, function () {
            animation.runImageAnimation(
            TheBoss,
            assets.animation`DefaultBoss`,
            200,
            true
            )
        })
    }
})
