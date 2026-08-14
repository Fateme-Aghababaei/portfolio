import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve(import.meta.dirname, '../public/projects')

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))

for (const file of files) {
  const inputPath = path.join(dir, file)
  const original = await sharp(inputPath).toBuffer()

  const compressed = await sharp(original).jpeg({ quality: 78, mozjpeg: true }).toBuffer()
  await sharp(compressed).toFile(inputPath)

  const webpPath = inputPath.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(original).webp({ quality: 78 }).toFile(webpPath)

  console.log(`${file}: ${(original.length / 1024).toFixed(0)}KB -> ${(compressed.length / 1024).toFixed(0)}KB jpg, ${path.basename(webpPath)}`)
}
