/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePostType = /* GraphQL */ `
  subscription OnCreatePostType(
    $post_id: ID
    $user_id: String
    $user_name: String
    $img_src_list: [String]
    $thumbnail_img_src: String
  ) {
    onCreatePostType(
      post_id: $post_id
      user_id: $user_id
      user_name: $user_name
      img_src_list: $img_src_list
      thumbnail_img_src: $thumbnail_img_src
    ) {
      post_id
      user_id
      img_src_list
      thumbnail_img_src
      items
      tags
      description
      page_views
      like_count
      base_color
      season
      face_type
      color
      country
      parts
      products_id
      makeup_categories
      is_glittery
      DateTime
      age
    }
  }
`;
export const onUpdatePostType = /* GraphQL */ `
  subscription OnUpdatePostType(
    $post_id: ID
    $user_id: String
    $user_name: String
    $img_src_list: [String]
    $thumbnail_img_src: String
  ) {
    onUpdatePostType(
      post_id: $post_id
      user_id: $user_id
      user_name: $user_name
      img_src_list: $img_src_list
      thumbnail_img_src: $thumbnail_img_src
    ) {
      post_id
      user_id
      img_src_list
      thumbnail_img_src
      items
      tags
      description
      page_views
      like_count
      base_color
      season
      face_type
      color
      country
      parts
      products_id
      makeup_categories
      is_glittery
      DateTime
      age
    }
  }
`;
export const onDeletePostType = /* GraphQL */ `
  subscription OnDeletePostType(
    $post_id: ID
    $user_id: String
    $user_name: String
    $img_src_list: [String]
    $thumbnail_img_src: String
  ) {
    onDeletePostType(
      post_id: $post_id
      user_id: $user_id
      user_name: $user_name
      img_src_list: $img_src_list
      thumbnail_img_src: $thumbnail_img_src
    ) {
      post_id
      user_id
      img_src_list
      thumbnail_img_src
      items
      tags
      description
      page_views
      like_count
      base_color
      season
      face_type
      color
      country
      parts
      products_id
      makeup_categories
      is_glittery
      DateTime
      age
    }
  }
`;
export const onCreateUserType = /* GraphQL */ `
  subscription OnCreateUserType(
    $user_id: ID
    $name: String
    $nickname: String
  ) {
    onCreateUserType(user_id: $user_id, name: $name, nickname: $nickname) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      age
    }
  }
`;
export const onUpdateUserType = /* GraphQL */ `
  subscription OnUpdateUserType(
    $user_id: ID
    $name: String
    $nickname: String
  ) {
    onUpdateUserType(user_id: $user_id, name: $name, nickname: $nickname) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      age
    }
  }
`;
export const onDeleteUserType = /* GraphQL */ `
  subscription OnDeleteUserType(
    $user_id: ID
    $name: String
    $nickname: String
  ) {
    onDeleteUserType(user_id: $user_id, name: $name, nickname: $nickname) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      age
    }
  }
`;
export const onCreateTagType = /* GraphQL */ `
  subscription OnCreateTagType($tag_name: String, $count: Int) {
    onCreateTagType(tag_name: $tag_name, count: $count) {
      tag_name
      count
    }
  }
`;
export const onUpdateTagType = /* GraphQL */ `
  subscription OnUpdateTagType($tag_name: String, $count: Int) {
    onUpdateTagType(tag_name: $tag_name, count: $count) {
      tag_name
      count
    }
  }
`;
export const onDeleteTagType = /* GraphQL */ `
  subscription OnDeleteTagType($tag_name: String, $count: Int) {
    onDeleteTagType(tag_name: $tag_name, count: $count) {
      tag_name
      count
    }
  }
`;
export const onCreateProductType = /* GraphQL */ `
  subscription OnCreateProductType(
    $product_id: ID
    $product_name: String
    $brand_name: String
    $product_category: String
    $price: String
  ) {
    onCreateProductType(
      product_id: $product_id
      product_name: $product_name
      brand_name: $brand_name
      product_category: $product_category
      price: $price
    ) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const onUpdateProductType = /* GraphQL */ `
  subscription OnUpdateProductType(
    $product_id: ID
    $product_name: String
    $brand_name: String
    $product_category: String
    $price: String
  ) {
    onUpdateProductType(
      product_id: $product_id
      product_name: $product_name
      brand_name: $brand_name
      product_category: $product_category
      price: $price
    ) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const onDeleteProductType = /* GraphQL */ `
  subscription OnDeleteProductType(
    $product_id: ID
    $product_name: String
    $brand_name: String
    $product_category: String
    $price: String
  ) {
    onDeleteProductType(
      product_id: $product_id
      product_name: $product_name
      brand_name: $brand_name
      product_category: $product_category
      price: $price
    ) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
