- Component testing on Dropdown component
  - Check mouse event interactions with the component.
  - Validate rendering
- Component testing on PresentationCardList component
  - Test useContext hook wrapped around a component and whether data is being correctly processed by the component.
  - Check the loading state which relates to how react query works and the different state of the component.
- Component testing on SlideControls
  - Test if the props put into the component are being correctly triggeredi

UI Testing of the entire flow from:
1. Register successfully.
2. Create new presentation successfully.
3. Update thumbnail and presentation name.
4. delete the updated presentation
5. Recreate the presentation and add slides
6. Navigate between the slides and validate the buttons appear.
7. Log out 
8. Log back in and the presentation should persist.
