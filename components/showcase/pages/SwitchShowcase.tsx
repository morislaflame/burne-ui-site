"use client";

import { SwitchAccentColorDemo } from "@/components/showcase/demos/switch/SwitchAccentColor.demo";
import switchAccentColorSource from "@/components/showcase/demos/switch/SwitchAccentColor.demo.tsx?raw";
import { SwitchCompoundThemeDemo } from "@/components/showcase/demos/switch/SwitchCompoundTheme.demo";
import switchCompoundThemeSource from "@/components/showcase/demos/switch/SwitchCompoundTheme.demo.tsx?raw";
import { SwitchClassNamesFullDemo } from "@/components/showcase/demos/switch/SwitchClassNamesFull.demo";
import switchClassNamesFullSource from "@/components/showcase/demos/switch/SwitchClassNamesFull.demo.tsx?raw";
import { SwitchClassNamesSimpleLabelDemo } from "@/components/showcase/demos/switch/SwitchClassNamesSimpleLabel.demo";
import switchClassNamesSimpleLabelSource from "@/components/showcase/demos/switch/SwitchClassNamesSimpleLabel.demo.tsx?raw";
import { SwitchDisabledDemo } from "@/components/showcase/demos/switch/SwitchDisabled.demo";
import switchDisabledSource from "@/components/showcase/demos/switch/SwitchDisabled.demo.tsx?raw";
import { SwitchGlossDemo } from "@/components/showcase/demos/switch/SwitchGloss.demo";
import switchGlossSource from "@/components/showcase/demos/switch/SwitchGloss.demo.tsx?raw";
import { SwitchNotificationsDemo } from "@/components/showcase/demos/switch/SwitchNotifications.demo";
import switchNotificationsSource from "@/components/showcase/demos/switch/SwitchNotifications.demo.tsx?raw";
import { SwitchSizesDemo } from "@/components/showcase/demos/switch/SwitchSizes.demo";
import switchSizesSource from "@/components/showcase/demos/switch/SwitchSizes.demo.tsx?raw";
import { SwitchSettingsPanelDemo } from "@/components/showcase/demos/switch/SwitchSettingsPanel.demo";
import switchSettingsPanelSource from "@/components/showcase/demos/switch/SwitchSettingsPanel.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SwitchShowcase() {
  return (
    <ShowcasePage
      title="Switch"
      description="On/off switch with label and status disabled."
      importPath='import { Switch } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Base" description="Controlled switch with label.">
        <ShowcaseDemoFromFile Demo={SwitchNotificationsDemo} source={switchNotificationsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={SwitchSizesDemo} source={switchSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Disabled" description="Inactive switch.">
        <ShowcaseDemoFromFile Demo={SwitchDisabledDemo} source={switchDisabledSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="gloss — glass track and circle (prop gloss on the root).">
        <ShowcaseDemoFromFile Demo={SwitchGlossDemo} source={switchGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={SwitchClassNamesFullDemo}
          source={switchClassNamesFullSource}
        />
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={SwitchClassNamesSimpleLabelDemo}
          source={switchClassNamesSimpleLabelSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Settings panel, compound Track and custom color — demo-files in `demos/switch/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SwitchSettingsPanelDemo} source={switchSettingsPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SwitchCompoundThemeDemo} source={switchCompoundThemeSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SwitchAccentColorDemo} source={switchAccentColorSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
