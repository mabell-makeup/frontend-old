export const filterPostsByUserName = /\{post\(user_name:.+\)\{img_srcuser_name\}\}/
export const getSuggestionItems = /\{suggestionItems\(item_name:".+",limit:20\)\{item_idbrand_nameitem_name\}\}/
export const getPostsByConditions = /\{posts\(personal_color:".+",faceType:".+",color:".+",country:".+",parts:".+",hairStyle:".+",items:\[.+\]\)\{post_idthumbnail_img_src\}\}/