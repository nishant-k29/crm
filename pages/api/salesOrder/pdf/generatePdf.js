import htmlTemplate from '../pdf/htmlTemplate'
const puppeteer = require('puppeteer')

const pdf = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    const options = {
      path:'./public/temp/salesOrder.pdf',
      format: 'A4',
      printBackground: true,
    }

    await page.goto('http://localhost:3000/salesOrder', {waitUntil: 'networkidle2'})
    await page.setContent(htmlTemplate)
    await page.pdf(options)
    await browser.close()

  }catch(e){
    console.log(e)
  }
}

export default async (req, res) => {
  await pdf()
  res.status(200).json({ status: 'success' })
}
