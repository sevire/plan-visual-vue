const plotConfig = {
  margin: 20,
  trackHeight: 20,
  trackGap: 5,
  dayWidth: 300,
  dateMin: new Date('2022-01-01')
}

// let colourIndex = 0
// const colourList = ['red', 'blue', 'purple', 'pink', 'orange', 'cyan']

export function drawVisual (planData) {
  console.log('Draw Visual')
  console.log(planData)
  console.log('dateMin', plotConfig.dateMin)

  const canvas = document.getElementById('plan-visual')
  const context = canvas.getContext('2d')

  console.log('Canvas width, height', canvas.width, canvas.height)
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'green'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.font = '15px Arial'

  plotConfig.plotWidth = canvas.width - (2 * plotConfig.margin)

  planData.forEach((activity) => {
    console.log('activity', activity)
    const startDate = new Date(activity.start_date)
    const endDate = new Date(activity.end_date)

    plotActivity(startDate, endDate, activity.trackNum, activity.name, plotConfig, context)
  })
}

function dayDiff (startDate, endDate) {
  console.log('dayDiff', startDate, endDate)
  const timeDiff = endDate.getTime() - startDate.getTime()
  return timeDiff / (1000 * 3600 * 24)
}

function plotActivity (startDate, endDate, trackNumber, text, config, ctx) {
  console.log('plotActivity (dateMin)', config.dateMin)
  const daysFromLeft = dayDiff(config.dateMin, startDate)
  const activityDayWidth = dayDiff(startDate, endDate)
  const activityPlotWidth = activityDayWidth / config.dayWidth * config.plotWidth
  const x = config.margin + daysFromLeft / config.dayWidth * config.plotWidth

  const y = trackNumToOffset(trackNumber, config)

  // const colour = colourList[colourIndex]
  // console.log('Bar index, colour = ', colourIndex, colour)
  // colourIndex = (colourIndex + 1) % 6
  ctx.fillStyle = 'cyan'
  ctx.fillRect(x, y, activityPlotWidth, config.trackHeight)
  ctx.fillStyle = 'red'
  ctx.fillText(text, x + 5, y + config.trackHeight - 5)
}

function trackNumToOffset (trackNum, config) {
  return config.margin + (config.trackHeight + config.trackGap) * trackNum
}
