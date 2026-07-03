"use client";

import { SearchInputBasicDemo } from "@/components/showcase/demos/search-input/SearchInputBasic.demo";
import searchInputBasicSource from "@/components/showcase/demos/search-input/SearchInputBasic.demo.tsx?raw";
import { SearchInputSizesDemo } from "@/components/showcase/demos/search-input/SearchInputSizes.demo";
import searchInputSizesSource from "@/components/showcase/demos/search-input/SearchInputSizes.demo.tsx?raw";
import { SearchInputCommandBarDemo } from "@/components/showcase/demos/search-input/SearchInputCommandBar.demo";
import searchInputCommandBarSource from "@/components/showcase/demos/search-input/SearchInputCommandBar.demo.tsx?raw";
import { SearchInputFilterResultsDemo } from "@/components/showcase/demos/search-input/SearchInputFilterResults.demo";
import searchInputFilterResultsSource from "@/components/showcase/demos/search-input/SearchInputFilterResults.demo.tsx?raw";
import { SearchInputGlossDemo } from "@/components/showcase/demos/search-input/SearchInputGloss.demo";
import searchInputGlossSource from "@/components/showcase/demos/search-input/SearchInputGloss.demo.tsx?raw";
import { SearchInputGlossHeroDemo } from "@/components/showcase/demos/search-input/SearchInputGlossHero.demo";
import searchInputGlossHeroSource from "@/components/showcase/demos/search-input/SearchInputGlossHero.demo.tsx?raw";
import { SearchInputWithResultDemo } from "@/components/showcase/demos/search-input/SearchInputWithResult.demo";
import searchInputWithResultSource from "@/components/showcase/demos/search-input/SearchInputWithResult.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SearchInputShowcase() {
  return (
    <ShowcasePage
      title="SearchInput"
      description="Search field with icon and controlled value."
      importPath='import { SearchInput } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Search" description="Controlled through value and onValueChange.">
        <ShowcaseDemoFromFile align="center" Demo={SearchInputBasicDemo} source={searchInputBasicSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="center" Demo={SearchInputSizesDemo} source={searchInputSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Result" description="Current search field value.">
        <ShowcaseDemoFromFile align="center" Demo={SearchInputWithResultDemo} source={searchInputWithResultSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass shell with motion.">
        <ShowcaseDemoFromFile align="center" Demo={SearchInputGlossDemo} source={searchInputGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Command bar, filter with badges and gloss hero — demo-files in `demos/search-input/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SearchInputCommandBarDemo} source={searchInputCommandBarSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SearchInputFilterResultsDemo} source={searchInputFilterResultsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SearchInputGlossHeroDemo} source={searchInputGlossHeroSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="value, onValueChange, placeholder, aria-label — controlled search icon field."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Availability">
          <p>
            Be sure to indicate <code>aria-label</code>, if there is no visible label — the component does not render
            default text signature.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
