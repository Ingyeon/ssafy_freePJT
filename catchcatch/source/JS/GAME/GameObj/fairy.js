import { input, camera, aliens } from "../game.js";
import Magic from "./magic.js";
import Skill from "./skill.js";
export default class Fairy extends Phaser.Physics.Arcade.Sprite {
  // 얘는 공격 스프라이트 객체
  player;
  fairyNum;
  attack;
  // 얘는 스킬 스프라이트 객체
  skill;
  skillUse = false;
  skillCD = 100;
  timer = 0;
  maxAttackCount;
  attackCount;
  maxPierceCount = 99999;
  pierceCount = 99999;
  velo;
  size = 0.5;
  spriteScale = 1;
  
  // 사신 특성
  vampire;
  swordaura = false;
  // 닌자 특성
  stun;
  deathCount;
  isTriple = false;
  // 슬라임 특성
  bounceCount = 0;
  copyCount = 0;

  // 마녀 특성
  maxBombCount;
  bombcount = 999999;
  bombtime = 3;
  
  // 레벨
  level = 1;
  
  // 진화 여부
  evo1 = false;
  evo2 = false;


  skillSprite = 1;
  hh;
  hw;
  constructor(
    scene,
    skillCD,
    dmg,
    dmg_bonus,
    range,
    as,
    as_bonus,
    velo,
    fairyNum,
    player,
    size,
    spriteScale
  ) {
    super(scene, -10000, -10000, "fairy" + fairyNum);
    this.fairyNum = fairyNum;
    this.scale = 0.35;
    this.alpha = 1;
    this.player = player;
    this.skillCD = skillCD;
    this.dmg = dmg;
    this.dmg_bonus = dmg_bonus;
    this.range = range;
    this.as = as;
    this.as_bonus = as_bonus;
    this.velo = velo;
    this.size = size;
    this.spriteScale = spriteScale;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
  // 마법사
  initFairy1(attackCount, pierceCount) {
    this.maxAttackCount = attackCount;
    this.maxPierceCount = pierceCount;
    this.attackCount = attackCount;
    this.pierceCount = pierceCount;
  }
  // 사신
  initFairy2(size, vampire) {
    this.size = size;
    this.vampire = vampire;
    this.maxPierceCount = 99999;
    this.pierceCount = 99999;
  }
  // 닌자
  initFairy3(stun, deathCount) {
    this.stun = stun;
    this.deathCount = deathCount;
    this.maxPierceCount = 99999;
    this.pierceCount = 99999;
  }
  // 슬라임
  initFairy4() {}
  // 마녀
  initFairy5(size, maxBombCount) {
    this.size = size;
    this.maxBombCount = maxBombCount;
    this.bombcount = maxBombCount;
    this.maxPierceCount = 99999;
    this.pierceCount = 99999;
  }

  levelUp() {
    this.dmg += this.dmg_bonus;
    switch (this.level) {
      case 1:
        this.levelUp2();
        break;
      case 2:
        this.levelUp3();
        break;
      case 3:
        this.levelUp4();
        break;
      case 4:
        this.levelUp5();
        break;
      case 5:
        this.levelUp6();
        break;
      case 6:
        this.levelUp7();
        break;
      case 7:
        this.levelUp8();
        break;
      case 8:
        this.levelUp9();
        break;
    }
  }

  levelUp2() {
    this.level = 2;
    switch (this.fairyNum) {
      case 1:
        this.maxAttackCount++;
        break;
      case 2:
        this.spriteScale += 0.5;
        break;
      case 3:
        this.range += 2;
        break;
      case 4:
        this.as -= this.as_bonus;
        break;
      case 5:
        this.maxBombCount++;
        this.bombcount++;
        break;
    }
  }

  levelUp3() {
    this.level = 3;
    switch (this.fairyNum) {
      case 1:
        this.as -= this.as_bonus;
        break;
      case 2:
        this.as -= this.as_bonus;
        break;
      case 3:
        this.as -= this.as_bonus;
        break;
      case 4:
        this.bounceCount += 3;
        break;
      case 5:
        this.spriteScale += 0.5;
        break;
    }
  }

  levelUp4() {
    this.level = 4;
    switch (this.fairyNum) {
      case 1:
        this.maxPierceCount += 2;
        break;
      case 2:
        this.vampire++;
        break;
      case 3:
        this.stun += 0.5;
        break;
      case 4:
        this.copyCount = 5;
        break;
      case 5:
        this.maxBombCount++;
        this.bombcount++;
        break;
    }
  }

  levelUp5() {
    this.level = 5;
    this.evo1 = true;
    switch (this.fairyNum) {
      case 1:
        this.skillSprite = 1;
        this.skillCD = 300;
      case 2:
        this.skillSprite = 1;
        this.skillCD = 300;
        break;
      case 3:
        this.isTriple = true;
        break;
      // 집으로 귀환 가능
      case 4:
        this.skillCD = 7200;
        break;
      // 스페이스바로 즉시 폭발 가능
      case 5:
        this.skillCD = 720;
        break;
    }
  }

  levelUp6() {
    this.level = 6;
    switch (this.fairyNum) {
      case 1:
        this.maxAttackCount++;
        break;
      case 2:
        this.spriteScale += 0.5;
        break;
      case 3:
        this.range += 2;
        break;
      case 4:
        this.as -= this.as_bonus;
        break;
      case 5:
        this.maxBombCount++;
        this.bombcount++;
        break;
    }
  }

  levelUp7() {
    this.level = 7;
    switch (this.fairyNum) {
      case 1:
        this.as -= this.as_bonus;
        break;
      case 2:
        this.as -= this.as_bonus;
        break;
      case 3:
        this.as -= this.as_bonus;
        break;
      case 4:
        this.bounceCount += 3;
        break;
      case 5:
        this.spriteScale += 0.5;
        break;
    }
  }

  levelUp8() {
    this.level = 8;
    switch (this.fairyNum) {
      case 1:
        this.maxPierceCount += 2;
        break;
      case 2:
        this.vampire++;
        break;
      case 3:
        this.stun += 0.5;
        break;
      case 4:
        this.copyCount = 10;
        break;
      case 5:
        this.maxBombCount++;
        this.bombcount++;
        break;
    }
  }
  levelUp9() {
    this.level = 9;
    this.evo2 = true;
    switch (this.fairyNum) {
      case 1:
        this.skillSprite = 2;
      case 2:
        this.skillSprite = 2;
        break;
      case 3:
        this.isTriple = true;
        break;
      // 집으로 귀환 가능
      case 4:
        this.skillCD = 7200;
        break;
      // 스페이스바로 즉시 폭발 가능
      case 5:
        this.skillCD = 720;
        break;
    }
  }
  normalAttack(magic) {
    magics.add(magic);

    this.anims.play("fairy" + this.fairyNum + "_attack", true);
    // magic.body.width = 50;
    // magic.body.height = 50;
    // magic.body.offset.x = 25;
    // magic.body.offset.y = 25;

    magic.setScale(this.spriteScale);

    this.hw = magic.body.halfWidth;
    this.hh = magic.body.halfHeight;

    magic.setCircle(this.hw * this.size, this.hh - this.hw * this.size, this.hh - this.hw * this.size);



    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      input.x + camera.scrollX,
      input.y + camera.scrollY
    );

    angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
    magic.rotation += (angle - 180) / 60 - 1.5;

    magic.anims.play("magic" + this.fairyNum, true);

    switch (this.fairyNum) {
      case 1:
        if (this.attackCount > 0) {
          this.attackCount--;
          normalAttackTimer = this.as - 20;
        } else {
          this.attackCount = this.maxAttackCount;
          normalAttackTimer = 0;
        }
        break;
      case 2:
        magic.setVisible(false);
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        magic.body.checkCollision.none = true;
        normalAttackTimer = 0;
        if (this.evo2) {
          let magic2 = new Magic(thisScene, this);
          magic2.setScale(this.spriteScale / 2);
          let hhw = magic2.body.halfWidth;
          let hhh = magic2.body.halfHeight;
          magic.setCircle(hhw * this.size, hhh - hhw * this.size, hhh - hhw * this.size);
          magics.add(magic2);
          let angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            input.x + camera.scrollX,
            input.y + camera.scrollY
          );
          angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
          magic2.rotation += (angle - 180) / 60 - 1.5;
          magic2.setVisible(false);
          magic2.body.checkCollision.none = true;
          magic2.anims.play("magic" + this.fairyNum + "_1", true);
          let auraSpeed = 400;
          thisScene.physics.moveTo(
            magic2,
            input.x + camera.scrollX,
            input.y + camera.scrollY,
            auraSpeed
          );
        }
        break;
      case 3:
        // 3갈래는 영선님 알고리즘 사용하기
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        normalAttackTimer = 0;
        break;
      case 4:
        //
        normalAttackTimer = 0;
        magic.setBounce(this.bounceCount);
        break;
      case 5:
        magic.body.checkCollision.none = true;
        this.bombcount--;
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        this.velo = 0;
        normalAttackTimer = 0;
        break;
    }
    let speed = this.velo;
    console.log(this.player.x);
    console.log(input.x + camera.scrollX);
    if (this.velo !== 0) {
      if (this.player.body.velocity.x < 0 && this.player.x > (input.x + camera.scrollX)) {
        speed += this.player.speed;
      } else if (this.player.body.velocity.x > 0 && this.player.x < (input.x + camera.scrollX)) {
        speed += this.player.speed;
      }
    }
    thisScene.physics.moveTo(
      magic,
      input.x + camera.scrollX,
      input.y + camera.scrollY,
      speed
    );
    control = true;
  }

  skillFire() {
    let skill;
    if(this.evo1){
      switch (this.fairyNum) {
        case 1:
          skill = new Skill(thisScene, this);
          magics.add(skill);
          skill.setDepth(2);
          skill.setScale(2);
          skill.setPosition(input.x + camera.scrollX, input.y + camera.scrollY);
          this.skillUse = true;
          this.timer = 0;
          break;
        case 2:
          skill = new Skill(thisScene, this);
          skill.setDepth(2);
          skill.setScale(2);
          magics.add(skill);
          skill.setPosition(this.x, this.y);
          this.skillUse = true;
          this.timer = 0;
          break;
        case 3:
          break;
        case 4:
          this.player.x = 0;
          this.player.y = 0;
          thisScene.followPoint.x = 0;
          thisScene.followPoint.y = 0;
          this.skillUse = true;
          this.timer = 0;
          break;
        case 5:
          console.log(this.skillCD);
          for (let i = 0; i < bombs.children.entries.length; i++){
            bombs.children.entries[i].bomb();
          }
          this.skillUse = true;
          this.timer = 0;
          break;
      }
    }
  }
}
