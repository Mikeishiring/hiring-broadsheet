export interface RelativeAnchor {
  readonly xRatio: number
  readonly yRatio: number
}

export type InteractionMode = 'read' | 'edit' | 'arrange'

export interface PullQuoteLayout {
  readonly widthRatio: number
  readonly yRatio: number
  readonly lineHeight: number
  readonly paddingV: number
  readonly paddingH: number
}

export interface RectObstacleLayout {
  readonly width: number
  readonly height: number
  readonly label?: string
  readonly anchor: RelativeAnchor
  readonly horizontalPadding: number
  readonly verticalPadding: number
}

export interface CircleObstacleLayout {
  readonly radius: number
  readonly label?: string
  readonly anchor: RelativeAnchor
  readonly horizontalPadding: number
  readonly verticalPadding: number
}

export interface ImageObstacleLayout {
  readonly src: string
  readonly width: number
  readonly height: number
  readonly anchor: RelativeAnchor
  readonly horizontalPadding: number
  readonly verticalPadding: number
}

export interface EditorialPageLayout {
  readonly dropCapLines: number
  readonly dropCapPadding: number
  readonly pullQuote: PullQuoteLayout
  readonly draggableRect: RectObstacleLayout
  readonly circle: CircleObstacleLayout
  readonly image: ImageObstacleLayout
}

export interface PageSourceRef {
  readonly label: string
  readonly videoUrl?: string
  readonly relatedPageId?: string
}

export interface EditorialPageContent {
  readonly headline: string
  readonly credit: string
  readonly bodyText: string
  readonly pullQuote: string
  readonly sources?: readonly PageSourceRef[]
}

export interface EditorialPageDefinition {
  readonly id: string
  readonly name: string
  readonly instructions: string
  readonly content: EditorialPageContent
  readonly layout: EditorialPageLayout
}
