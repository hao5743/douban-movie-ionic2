
export interface Actor{
  name:string,
  name_en:string,   //英文名
  id:string,
  aka:string[],     //别名
  aka_en:string[],
  gender:string,

  born_place:string,
  alt:string,      //链接地址
  mobile_url:string,   //移动链接地址

  avatars:{
    small:string,
    large:string,
    medium:string
  },
  works:{           //参与作品
    roles:string[],
    subject: any,
  }[]
}
