import { monsterSet, bossSet } from "../game.js";
import { petSkillAttackFunc } from "../game.js";
import TowerMagic from "./tower-magic";
import TowerSkill from "./tower-skill";
import tower from "../../UI/tower-upgrade.js";
import Player from "./player";
import { UpdateCatCoin } from "../../UI/ingame-ui.js";

export default class CatTower extends Phaser.Physics.Arcade.Sprite {
  weaponSprite;
  frameTime = 0;
  skillSprite;
  towerAttackTimer = 0; //총알 시간
  towerSkillAttackTimer = 0; //스킬 시간
  towerAS = [120, 0, 0, 0, 240, 90]; //총알 연사속도
  towerSkillAS = [
    [1800, 1500, 1200],
    [1200, 900, 600],
    [1000, 800, 540],
    [1200, 900, 600],
    [1200, 1200, 1200],
    [3600, 3600, 1800],
  ]; //스킬 연사속도
  towerDmg = [30, 0, 0, 0, 50, 50]; //총알 대미지
  towerSkillDmg = [0, 20, 20, 0, 0, 99999]; //스킬 대미지
  towerSkillcount = [
    [1, 1, 1],
    [8, 32, 64],
    [1, 4, 9],
    [8, 32, 64],
    [2, 4, 8],
    [1, 1, 1],
  ]; //스킬 소환 개수
  towerSkilldelay = [
    [3000, 4000, 5000],
    [1000, 1000, 1000],
    [3000, 4000, 5000],
    [6000, 11000, 15000],
    [15000, 15000, 15000],
    [1000, 1000, 1000],
  ];
  circleSize = 0.8;
  timedEvent;

  constructor(
    scene,
    stone,
    level,
    x,
    y,
    towerSprite,
    weaponSprite,
    weaponDeadSprite,
    skillSprite,
    skillShowSprite,
    skillDeadSprite
  ) {
    super(scene, x, y, towerSprite);

    this.scene = scene;
    this.weaponSprite = weaponSprite;
    this.weaponDeadSprite = weaponDeadSprite;
    this.skillSprite = skillSprite;
    this.skillShowSprite = skillShowSprite;
    this.skillDeadSprite = skillDeadSprite;
    this.stone = stone;
    this.level = level;
    this.invisible = "false";

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.anims.play(towerSprite, true);

    //테스트용
    // this.level = 2;
    // this.invisible = "true";

    scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  update(time, delta) {
    this.frameTime += delta;

    if (this.frameTime > 16.5) {
      this.frameTime = 0;
      if (player.body.velocity.x > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
      this.towerAttackTimer++;
      this.towerSkillAttackTimer++;
      if (this.towerAttackTimer >= this.towerAS[this.stone]) {
        this.towerAttackTimer = 0;

        //노멀

        if (this.stone === 0 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level; i++) {
            let magic = new TowerMagic(this.scene, this);
            petAttacks.add(magic);
            magic.anims.play(this.weaponSprite);
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180));
            let y = Math.sin(angle * (Math.PI / 180));
            this.scene.physics.moveTo(magic, this.x + x, this.y + y, 300);
          }
        }
        //전기
        if (this.stone === 1 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level; i++) {}
        }
        //불
        if (this.stone === 2 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level; i++) {}
        }
        //물
        if (this.stone === 3 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level; i++) {}
        }
        //땅
        if (this.stone === 4 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level; i++) {
            let magic = new TowerMagic(this.scene, this);
            petAttacks.add(magic);
            magic.anims.play(this.weaponSprite);
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180));
            let y = Math.sin(angle * (Math.PI / 180));
            this.scene.physics.moveTo(magic, this.x + x, this.y + y, 300);
          }
        }
        //갓
        if (this.stone === 5 && this.level > 0 && this.invisible === "true") {
          for (let i = 0; i < this.level * 3; i++) {
            let magic = new TowerMagic(this.scene, this);
            petAttacks.add(magic);
            magic.anims.play(this.weaponSprite);
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180));
            let y = Math.sin(angle * (Math.PI / 180));
            this.scene.physics.moveTo(magic, this.x + x, this.y + y, 300);
          }
        }
      }
      if (
        this.towerSkillAttackTimer >=
        this.towerSkillAS[this.stone][this.level - 1]
      ) {
        this.towerSkillAttackTimer = 0;

        //노멀

        if (this.stone === 0 && this.level > 0 && this.invisible === "true") {
          let skill = new TowerSkill(
            this.scene,
            this,
            player.x,
            player.y,
            1,
            6000,
            2
          );
          shield = true;
          UICam.ignore(skill);
          skill.setAlpha(0.5);
          skill.anims.play(this.skillSprite);
        }
        //전기
        if (this.stone === 1 && this.level > 0 && this.invisible === "true") {
          for (
            let i = 0;
            i < this.towerSkillcount[this.stone][this.level - 1];
            i++
          ) {
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180)) * 300;
            let y = Math.sin(angle * (Math.PI / 180)) * 200;
            let skill = new TowerSkill(
              this.scene,
              this,
              player.x + x,
              player.y + y,
              1,
              this.towerSkilldelay[this.stone][this.level - 1],
              2
            );
            UICam.ignore(skill);
            skill.setSize(30, 50);
            skill.body.offset.x = 20;
            skill.body.offset.y = 5;
            skill.anims.play(this.skillSprite);
            thisScene.physics.add.overlap(skill, bossSet, petSkillAttackFunc);
            thisScene.physics.add.overlap(
              skill,
              monsterSet,
              petSkillAttackFunc
            );
          }
        }
        //불
        if (this.stone === 2 && this.level > 0 && this.invisible === "true") {
          for (
            let i = 0;
            i < this.towerSkillcount[this.stone][this.level - 1];
            i++
          ) {
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180)) * 300;
            let y = Math.sin(angle * (Math.PI / 180)) * 200;
            let skill = new TowerSkill(
              this.scene,
              this,
              player.x + x,
              player.y + y,
              1,
              this.towerSkilldelay[this.stone][this.level - 1],
              2
            );
            UICam.ignore(skill);
            skill.setSize(30, 50);
            skill.body.offset.x = 20;
            skill.body.offset.y = 5;
            skill.anims.play(this.skillSprite);
            thisScene.physics.add.overlap(skill, bossSet, petSkillAttackFunc);
            thisScene.physics.add.overlap(
              skill,
              monsterSet,
              petSkillAttackFunc
            );
          }
        }
        //물
        if (this.stone === 3 && this.level > 0 && this.invisible === "true") {
          for (
            let i = 0;
            i < this.towerSkillcount[this.stone][this.level - 1];
            i++
          ) {
            let angle = Math.floor(Math.random() * 360);
            let x = Math.cos(angle * (Math.PI / 180));
            let y = Math.sin(angle * (Math.PI / 180));
            let skill = new TowerSkill(
              this.scene,
              this,
              player.x,
              player.y,
              1,
              this.towerSkilldelay[this.stone][this.level - 1],
              2
            );
            UICam.ignore(skill);
            skill.setSize(50, 30);
            skill.body.offset.x = 10;
            skill.body.offset.y = 30;
            skill.anims.play(this.skillSprite);
            this.scene.physics.moveTo(skill, skill.x + x, skill.y + y, 130);
            this.scene.physics.add.collider(skill, monsterSet);
            this.scene.physics.add.collider(skill, bossSet);
          }
        }
        //땅
        if (this.stone === 4 && this.level > 0 && this.invisible === "true") {
          let angle = Math.floor(Math.random() * 360);
          let x = Math.cos(angle * (Math.PI / 180)) * 300;
          let y = Math.sin(angle * (Math.PI / 180)) * 200;
          for (
            let i = 0;
            i < this.towerSkillcount[this.stone][this.level - 1];
            i++
          ) {
            let skill = new TowerSkill(
              this.scene,
              this,
              player.x + i * 30,
              player.y,
              1,
              this.towerSkilldelay[this.stone][this.level - 1],
              2
            );
            UICam.ignore(skill);
            skill.setSize(30, 40);
            skill.body.offset.x = 20;
            skill.body.offset.y = 15;
            skill.body.immovable = true;
            skill.anims.play(this.skillSprite);
            this.scene.physics.add.collider(skill, monsterSet);
            this.scene.physics.add.collider(skill, bossSet);
          }
        }
        //갓
        if (this.stone === 5 && this.level > 0 && this.invisible === "true") {
          let skill = new TowerSkill(
            this.scene,
            this,
            player.x,
            player.y,
            1,
            this.towerSkilldelay[this.stone][this.level - 1],
            2
          );

          UICam.ignore(skill);
          skill.setScale(10);
          skill.setDepth(100);
          skill.setSize(75, 72);
          skill.body.offset.x = -5;
          skill.body.offset.y = -3;
          skill.anims.play(this.skillSprite);
          // thisScene.physics.add.overlap(skill, bossSet, petSkillAttackFunc);
          thisScene.physics.add.overlap(skill, monsterSet, petSkillAttackFunc);
        }
      }

      if (this.level > 0 && this.invisible === "false") {
        this.invisible = "true";
        this.setVisible(true);
      }
    }
  }

  scale_Circle() {
    this.setScale(this.circleSize);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, (hh - hw) * 5, (hh - hw) * 5);
  }

  levelUp() {
    this.level++;
    if (this.level === 3) {
      levelCount += 1;
    }
  }

  overlaphit() {}
}
