Principles:
1. Mobile first
2. Extensible
3. Use the Web (HTML) -- so many cool tags like aside, progress, meter, caption, dialog, details, summary, etc.

Make it trivial to implement something like:
https://courses.edx.org/courses/course-v1:MITx+7.QBWx_3+1T2016/courseware/8e7264a9153c4938bdb900300b4ce9fc/544777753fb54d6ba6a6a9c21b4e72b5/2

Concepts:

Problem
* Apply State (decoupled from Problem item ID)

Prompt
* Basic templating support.
* Understands parameterization.

InputGroup
* Has Inputs
* Handles Communication to/from Graders
* Queries Inputs when it is time to Submit (ordered list)

Input
* Implements at least: name, type, value
* Input value can be set from saved state

Grader
* grade(variant, input values) -> (
    correctness: {
        per-input and overall
    },
    feedback: {
        per-input and overall
    },
    Hint? Explanation?
  )
* answer(variant) -> {

}

## Interactions

Assumption: Auth already figured out.

Hit URL:
* Look up

1. Question HTML is statically loaded, along with JavaScript bundles.
2. REST endpoint handles policy +
3. WASM for graders

Compositor
* Figures out the next problem to give you.
** Loads problem into an iframe?

High Level Overview of Next Courseware

Courseware
* URL handler identifies which Nav to use
* ContentNavigation creates any sort of nav chrome, figures out what the current
  thing to view is, and then instantiates a ContentLoader and ContentPlugins
* ContentLoader (different classes for things like LtiContentLoader,
  OxqContentLoader, XBlockContentLoader, CourseContentLoader (whole sequence at a time
  )). Figures out how to load a particular piece of content (Unit or more granular). Iframes things in.
  ^^ Plugins would not be for things like Hints that have to show up inline, but
  could be for things like events.
* ContentPlugins (defer this load). API is message passing.