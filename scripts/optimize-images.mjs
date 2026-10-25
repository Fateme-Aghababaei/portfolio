import { readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve(import.meta.dirname, '../public/projects')
const files = (await readdir(dir)).filter((file) => /\.(jpe?g|png)$/i.test(file))

for (const file of files) {
  const inputPath = path.join(dir, file)
  const webpPath = inputPath.replace(/\.(jpe?g|png)$/i, '.webp')
  // Refuse to overwrite an existing WebP or repeatedly compress it.
  const compressed = await sharp(inputPath).webp({ quality: 78 }).toBuffer()
  await writeFile(webpPath, compressed, { flag: 'wx' })
  await unlink(inputPath)
  console.log(`${file} -> ${path.basename(webpPath)} (${(compressed.length / 1024).toFixed(0)}KB)`)
}
