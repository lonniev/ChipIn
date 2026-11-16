/**
 * 示范活儿，简体中文版。每一项都写明在哪里、什么时候、怎样才算“做完”，
 * 一句一行（行与行之间用 \n 隔开）。
 */

import type { SamplesText } from "../../lib/samples.ts";

export const samples: SamplesText = {
  "sweep-kitchen": {
    kind: "每天的习惯",
    title: "扫厨房的地",
    description: "每天晚上，晚饭收拾好以后。\n桌子底下和橱柜边都要扫到。\n把簸箕里的垃圾倒进垃圾桶，再把扫帚挂回钩子上。",
    grades: [
      {
        name: "一尘不染",
        criteria: "桌子底下和橱柜边都没有碎屑"
      },
      {
        name: "扫过了",
        criteria: "扫了，有几处漏掉"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "每天做一点小事，日子久了就很可观。"
  },
  "make-bed": {
    kind: "每天的习惯",
    title: "上学前整理好床铺",
    description: "每个上学的早晨，吃早饭之前。\n把床单和被子拉平，枕头放在床头。\n睡衣放在枕头下面。",
    grades: [
      {
        name: "整理好了",
        criteria: "铺得平整，枕头在床头，地上没有东西"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "用做完一件事来开始新的一天。"
  },
  "trash-cans": {
    kind: "每周的活儿",
    title: "把垃圾桶推到路边",
    description: "星期四傍晚，天黑之前。\n把两个垃圾桶从屋子侧面推到车道尽头，盖子盖好。\n星期五放学后再把它们推回来。",
    grades: [
      {
        name: "推出又推回",
        criteria: "星期四推出去，星期五推回来"
      },
      {
        name: "只推出去",
        criteria: "按时推出去了，推回来的是别人"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "大家都指望你记得这件事。"
  },
  "walk-dog": {
    kind: "照顾别人",
    title: "带 Rex 在附近走一圈",
    description: "放学以后，晚饭之前。\n牵好绳子，绕着街区走二十分钟。\n带上袋子，回来后给它的水碗加满水。",
    grades: [
      {
        name: "遛得很好",
        criteria: "走了二十分钟，用了袋子，水碗加满了"
      },
      {
        name: "遛得太短",
        criteria: "出门到回来还不到十分钟"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "有谁正依靠着你的劳动。"
  },
  "weed-bed": {
    kind: "一次性的大活儿",
    title: "给门前的花坛除草",
    description: "这个星期六上午，午饭之前。\n门前台阶旁的花坛，从小路到篱笆那一段。\n每棵杂草都要连根拔起，放进庭院垃圾桶。",
    grades: [
      {
        name: "做得很棒",
        criteria: "杂草连根拔光，小路也扫干净了"
      },
      {
        name: "还可以",
        criteria: "大部分杂草拔掉了"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "越辛苦的活，挣得越多。"
  },
  "read-chapter": {
    kind: "动脑的活儿",
    title: "读一章书，讲给我们听",
    description: "这个星期的任何一个晚上，睡觉之前。\n把你的书完整地读一章。\n第二天吃晚饭时，给全家讲讲里面发生了什么。",
    grades: [
      {
        name: "读了也讲了",
        criteria: "读完了整章，还把故事讲给我们听了"
      },
      {
        name: "读了",
        criteria: "读了，可是讲不出多少内容"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "学习也是劳动，也值得得到报酬。"
  },
  "rake-leaves": {
    kind: "一份善意",
    title: "帮隔壁的 Miller 太太耙落叶",
    description: "星期六下午，先得到她的同意。\n把她家前院草坪上的落叶耙成一堆，放在路边。\n把耙子放回我们家的工具棚。",
    grades: [
      {
        name: "草坪清干净了",
        criteria: "整片前院草坪，落叶耙成一堆"
      },
      {
        name: "做了一半",
        criteria: "只耙了一部分草坪"
      },
      {
        name: "没做",
        criteria: ""
      }
    ],
    teaches: "劳动是服务邻居的一种方式。"
  }
};
