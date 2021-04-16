import { core, plugin, dynamicOutputMethod, objectType } from 'nexus'

export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.string('name')
  }
})

export const nexusCloudinary = () => {
  return plugin({
    name: 'nexus-cloudinary',
    description: 'Cloudinary plugin',

    onInstall(builder) {
      builder.addType(Image)
    }
  })
}
