export interface Movie{
  title:string, //电影名
  year:string,  //年份
  alt:string,   //网址
  id:string,    //id
  collect_count:number,  //收藏数目
  original_title:string,  //原名
  subtype:string,  //子分类,(movie 电视剧)
  genres:string[],  //分类 (剧情、爱情、动作等)

  rating:{        //评分
    max:number,
    average:number,
    stars:string,
    min:number
  },

  images:{       //电影海报
    small:string,
    large:string,
    medium:string
  },

  casts:{         //演员
    alt:string,   //网址
    avatars:{     //头像
      small:string,
      large:string,
      medium:string
    },
    name:string,  //姓名
    id:string
  }[],

  directors:{     //导演
    alt:string,
    avatars:{
      small:string,
      large:string,
      medium:string
    },
    name:string,
    id:string
  }[]

}
