import { monsterSet, bossSet } from "../game";
import TMagic from "./tmagic";
import TSkill from "./tskill";

export default class CatTower extends Phaser.Physics.Arcade.Image {
  weaponsprite;
  skillsprite;
  towerAttackTimer = 0;
  towerSkillAttackTimer = 0;
  towerAS = 50;
  towerSkillAS = 50;
  towerDmg = 1;
  towerSkillDmg = 5;
  towerweaponspeed = 500;
  towerskillspeed = 500;
  isAttack = false;
  isthree = true;
  timedEvent;
  constructor(scene, towerX, towerY, towersprite, weaponsprite, skillsprite) {
    super(scene, towerX, towerY, towersprite);

    this.scene = scene;
    this.weaponsprite = weaponsprite;
    this.skillsprite = skillsprite;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, monsterSet, this.overlaphit);
    scene.physics.add.overlap(this, bossSet, this.overlaphit);
  }

  scale_Circle() {
    this.setScale(0.1);
    console.log(this);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, hh - hw * 5, hh - hw * 5);
  }

  magicFire(game, tower, mouse, speed) {
    let magic = new TMagic(game, tower);

    let magicleft = new TMagic(game, tower);

    let magicright = new TMagic(game, tower);

    // magicleft.setScale(0.01);
    // magicright.setScale(0.01);
    if (this.isthree === false) {
      towerAttacks.add(magic);
    } else {
      towerAttacks.add(magic);
      towerAttacks.add(magicleft);
      towerAttacks.add(magicright);
    }
    game.physics.add.overlap(towerAttacks, monsterSet, tower.attack);

    tower.towerAttackTimer = 0;

    let angle = Phaser.Math.Angle.Between(tower.x, tower.y, mouse.x, mouse.y);

    magic.rotation = angle;
    var num = (tower.x - mouse.x) ** 2 + (tower.y - mouse.y) ** 2;
    var d = 145;
    var angle_dis = Math.sqrt(num);
    var angle_mouse = Math.asin(-(mouse.y - tower.y) / angle_dis);

    angle_mouse = (angle_mouse * 180) / Math.PI;
    if (mouse.x - tower.x < 0 && angle_mouse > 0) {
      angle_mouse = 180 - angle_mouse;
    } else if (mouse.x - tower.x < 0 && angle_mouse < 0) {
      angle_mouse = -angle_mouse - 180;
    } else if (angle_mouse === -0) {
      angle_mouse = -180;
    }

    var vxm;
    var vym;
    var vxp;
    var vyp;

    if (angle_mouse >= 0) {
      if (0 <= angle_mouse - 30 <= 90) {
        vxm = tower.x + d * Math.cos(((angle_mouse - 30) * Math.PI) / 180);
        vym = tower.y - d * Math.sin(((angle_mouse - 30) * Math.PI) / 180);
      }

      if (0 <= angle_mouse + 30 <= 90) {
        vxp = tower.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
        vyp = tower.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
      }
    } else {
      if (0 <= angle_mouse + 30) {
        vxm = tower.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
        vym = tower.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
      } else if (-180 < angle_mouse + 30) {
        vxm = tower.x + d * Math.cos((-(angle_mouse + 30) * Math.PI) / 180);
        vym = tower.y + d * Math.sin((-(angle_mouse + 30) * Math.PI) / 180);
      }
      vxp =
        tower.x - d * Math.cos(((180 - (angle_mouse - 30)) * Math.PI) / 180);
      vyp =
        tower.y - d * Math.sin(((180 - (angle_mouse - 30)) * Math.PI) / 180);
    }

    if (tower.isthree === false) {
      game.physics.moveTo(magic, mouse.x, mouse.y, speed);
    } else {
      game.physics.moveTo(magicleft, vxm, vym, speed);
      game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      game.physics.moveTo(magicright, vxp, vyp, speed);
    }
    // control = true;
  }

  attack(magic, alien) {
    if (!alien.invincible) {
      magic.destroy();

      alien.health -= magic.dmg;
      //   console.log(alien.health);
      alien.invincible = true;
      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
    }
  }

  skillattack(skill, alien) {
    if (!alien.invincible) {

      alien.health -= skill.dmg;
      //   console.log(alien.health);
      alien.invincible = true;
      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
    }
  }

  overlaphit(tower, enemy) {
    if (tower.towerAttackTimer > tower.towerAS) {
      tower.magicFire(tower.scene, tower, enemy, tower.towerweaponspeed);
      tower.towerAttackTimer = 0;
    }

    if (tower.towerSkillAttackTimer > tower.towerSkillAS) {
      tower.skillFire(tower.scene, tower, enemy, tower.towerskillspeed);
      tower.towerSkillAttackTimer = 0;
    }
  }

  skillFire(game, tower, mouse, speed) {
    // console.log(1234)
    let skill = new TSkill(game, tower);
    skill.body.checkCollision.none = true;
    var hw = skill.body.halfWidth;
    var hh = skill.body.halfHeight;
    skill.setCircle(hw * 1000, hh - hw * 1000, hh - hw * 1000);


    towerSkillAttacks.add(skill);
    // console.log(towerSkillAttacks)
    game.physics.add.overlap(towerSkillAttacks, monsterSet, tower.skillattack);

    tower.towerSkillAttackTimer = 0;

    game.tweens.add({
      targets: skill,
      x: mouse.x,
      y: mouse.y,
      duration: speed,
      ease: "Linear",
      completeDelay: speed,
    });
  };


}