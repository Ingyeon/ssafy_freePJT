export default class Skill extends Phaser.Physics.Arcade.Sprite {
    collidingEditEnemy = null;
    dmg;
    fairy;
    pierceCount = 999999;

    constructor(scene, fairy) {
        super(scene, fairy.x, fairy.y, "skill" + fairy.fairyNum);
        scene.time.addEvent({
            delay: (fairy.range * 2000), callback: () => {
                this.destroy();
            }, loop: false
        });
        this.dmg = fairy.dmg * 2;
        this.fairy = fairy;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.play("anim")
    }
}