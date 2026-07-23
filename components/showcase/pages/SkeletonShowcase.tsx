"use client";

import { SkeletonAnimationsDemo } from "@/components/showcase/demos/skeleton/SkeletonAnimations.demo";
import skeletonAnimationsSource from "@/components/showcase/demos/skeleton/SkeletonAnimations.demo.tsx?raw";
import { SkeletonClassNamesFullDemo } from "@/components/showcase/demos/skeleton/SkeletonClassNamesFull.demo";
import skeletonClassNamesFullSource from "@/components/showcase/demos/skeleton/SkeletonClassNamesFull.demo.tsx?raw";
import { SkeletonArticlePreviewDemo } from "@/components/showcase/demos/skeleton/SkeletonArticlePreview.demo";
import skeletonArticlePreviewSource from "@/components/showcase/demos/skeleton/SkeletonArticlePreview.demo.tsx?raw";
import { SkeletonBasicShapesDemo } from "@/components/showcase/demos/skeleton/SkeletonBasicShapes.demo";
import skeletonBasicShapesSource from "@/components/showcase/demos/skeleton/SkeletonBasicShapes.demo.tsx?raw";
import { SkeletonProfileCardDemo } from "@/components/showcase/demos/skeleton/SkeletonProfileCard.demo";
import skeletonProfileCardSource from "@/components/showcase/demos/skeleton/SkeletonProfileCard.demo.tsx?raw";
import { SkeletonRegionDemo } from "@/components/showcase/demos/skeleton/SkeletonRegion.demo";
import skeletonRegionSource from "@/components/showcase/demos/skeleton/SkeletonRegion.demo.tsx?raw";
import { SkeletonTableRowsDemo } from "@/components/showcase/demos/skeleton/SkeletonTableRows.demo";
import skeletonTableRowsSource from "@/components/showcase/demos/skeleton/SkeletonTableRows.demo.tsx?raw";
import { SkeletonTextBlockDemo } from "@/components/showcase/demos/skeleton/SkeletonTextBlock.demo";
import skeletonTextBlockSource from "@/components/showcase/demos/skeleton/SkeletonTextBlock.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SkeletonShowcase() {
  return (
    <ShowcasePage
      title="Skeleton"
      description="Loading placeholders with animations pulse, wave and shimmer."
      importPath='import { Skeleton } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Basic forms" description="Rectangle and circle.">
        <ShowcaseDemoFromFile Demo={SkeletonBasicShapesDemo} source={skeletonBasicShapesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Text and Block" description="Multiline text and block container.">
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonTextBlockDemo} source={skeletonTextBlockSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Animations" description="variant pulse, wave and shimmer.">
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonAnimationsDemo} source={skeletonAnimationsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on each subcomponent."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={SkeletonClassNamesFullDemo}
          source={skeletonClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Skeleton.Region"
        description="Parent container with `aria-busy` / `aria-live` — decorative skeletons stay hidden from AT."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonRegionDemo} source={skeletonRegionSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Profile, table rows and article preview — `demos/skeleton/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonProfileCardDemo} source={skeletonProfileCardSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonTableRowsDemo} source={skeletonTableRowsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SkeletonArticlePreviewDemo} source={skeletonArticlePreviewSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Skeleton.Circle, Skeleton.Text, Skeleton.Block, Skeleton.Region — ready-made forms and a11y parent. classNames on each subcomponent."
          />
          <ShowcaseDoc.ApiRow
            api="simple"
            description="Root Skeleton with className — arbitrary shape through dimensions."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Animations">
          <p>
            <code>pulse</code>, <code>wave</code>, <code>shimmer</code> — prop <code>animation</code> on any
            subcomponent Skeleton.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Accessibility">
          <p>
            Wrap placeholders in <code>Skeleton.Region</code> (<code>busy</code> → <code>aria-busy</code>,
            always <code>aria-live=&quot;polite&quot;</code>). Add <code>aria-label</code> for the region name.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
