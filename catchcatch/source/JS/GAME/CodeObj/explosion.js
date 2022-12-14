import Player from "./player";

export default class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    // magic5_1를 나중에 폭발 스프라이트 애니메이션  key로 바꾸기
    super(scene, x, y, "monster_die");
    scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
    scene.add.existing(this);
    this.scale = 2;
    this.play("monster_die");
    this.setDepth(3);
  }
}
