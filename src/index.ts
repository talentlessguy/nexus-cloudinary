import { objectType, stringArg, nonNull, arg, inputObjectType, extendType, plugin } from 'nexus'

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('uploadImage', {
      type: UploadedImage,
      args: {
        file: nonNull(stringArg()),
        uploadOptions: arg({ type: UploadOptionsInput })
      },
      resolve: async (_, { file, uploadOptions }, ctx) => {
        return await ctx.cloudinary.uploader.upload(file, uploadOptions)
      }
    })
  }
})

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getImageUrl', {
      type: 'String',
      args: {
        imageName: nonNull(stringArg()),
        transformOptions: arg({ type: TransformImageOptionsInput })
      },
      resolve(_, { imageName, transformOptions }, ctx) {
        let result = ''
        if (transformOptions) {
          result = ctx.cloudinary.url(imageName, { ...transformOptions })
        } else {
          result = ctx.cloudinary.url(imageName)
        }
        return result
      }
    })
  }
})

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.string('tag_name')
  }
})

export const UploadedImage = objectType({
  name: 'UploadedImage',
  definition(t) {
    t.nonNull.string('public_id')
    t.nonNull.int('version')
    t.nonNull.string('signature')
    t.nonNull.int('width')
    t.nonNull.int('height')
    t.nonNull.string('format')
    t.nonNull.string('resource_type')
    t.nonNull.string('created_at')
    t.nonNull.list.field('tags', { type: Tag })
    t.nonNull.int('bytes')
    t.nonNull.string('type')
    t.nonNull.string('etag')
    t.nonNull.string('url')
    t.nonNull.string('secure_url')
    t.nonNull.string('original_filename')
  }
})

export const CategoryInput = inputObjectType({
  name: 'CategoryInput',
  definition(t) {
    t.string('name')
  }
})
export const TagInput = inputObjectType({
  name: 'TagInput',
  definition(t) {
    t.nonNull.string('tag_name')
  }
})
export const TransformImageOptionsInput = inputObjectType({
  name: 'TransformImageOptionsInput',
  definition(t) {
    t.int('width')
    t.int('height')
    t.string('crop')
  }
})
export const UploadOptionsInput = inputObjectType({
  name: 'UploadOptionsInput',
  definition(t) {
    t.string('public_id')
    t.string('folder')
    t.boolean('use_filename')
    t.boolean('unique_filename')
    t.string('resource_type')
    t.string('type')
    t.string('access_mode')
    t.boolean('discard_original_filename')
    t.boolean('overwrite')
    t.list.field('tags', { type: TagInput })
    t.boolean('colors')
    t.boolean('faces')
    t.boolean('quality_analysis')
    t.boolean('cinemegraph_analysis')
    t.boolean('image_metadata')
    t.boolean('phash')
    t.boolean('auto_tagging')
    t.list.field('categorization', { type: CategoryInput })
  }
})

export const nexusCloudinary = () => {
  return plugin({
    name: 'nexus-cloudinary',
    description: 'Cloudinary plugin',

    onInstall(builder) {
      // Add types
      builder.addType(Tag)
      builder.addType(UploadedImage)
      builder.addType(CategoryInput)
      builder.addType(Mutation)
      builder.addType(Query)
      builder.addType(TagInput)
      builder.addType(TransformImageOptionsInput)
      builder.addType(UploadOptionsInput)
    }
  })
}
