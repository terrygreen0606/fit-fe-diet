/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import PrivateRoute from 'components/common/PrivateRoute';
import AuthRoute from 'components/common/AuthRoute';

import { routes } from 'constants/routes';

// Views
const LoginView = React.lazy(() => import('./views/LoginView'));
const RegisterView = React.lazy(() => import('./views/RegisterView'));
const NutritionPlanView = React.lazy(() => import('./views/NutritionPlanView'));
const TrainingsView = React.lazy(() => import('./views/TrainingsView'));
const ShoppingListView = React.lazy(() => import('./views/ShoppingListView'));
const WeightGraphicsPage = React.lazy(() => import('./views/WeightGraphicsPage'));
const RecipesView = React.lazy(() => import('./views/Recipes/RecipesView'));
const FoodPlanView = React.lazy(() => import('./views/FoodPlanView'));
const CreateRecipeView = React.lazy(() => import('./views/Recipes/CreateRecipeView'));
const WaterTrackerView = React.lazy(() => import('./views/WaterTrackerView'));
const SettingsChangeMealPlanView = React.lazy(() => import('./views/Settings/SettingsChangeMealPlanView'));
const SettingsPersonalView = React.lazy(() => import('./views/Settings/SettingsPersonalView'));
const NotFound = React.lazy(() => import('./views/NotFound'));
const SavedRecipesView = React.lazy(() => import('./views/Recipes/SavedRecipesView'));
const FavouriteRecipesView = React.lazy(() => import('./views/Recipes/FavouriteRecipesView'));
const DashboardView = React.lazy(() => import('./views/DashboardView'));
const SettingsFaqView = React.lazy(() => import('./views/Settings/SettingsFaqView'));
const SettingsFamilyView = React.lazy(() => import('./views/Settings/SettingsFamilyView'));
const ReferralView = React.lazy(() => import('./views/ReferralView'));
const MainView = React.lazy(() => import('./views/MainView'));
const TestimonialsFormView = React.lazy(() => import('./views/Forms/TestimonialsFormView'));
const CancellationFormView = React.lazy(() => import('./views/Forms/CancellationFormView'));
const RecipeFullView = React.lazy(() => import('./views/Recipes/RecipeFullView'));

const Routes = () => (
  <Switch>
    <PrivateRoute
      path={routes.main}
      component={(props: any) => (
        <Layout {...props}>
          <MainView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.shoppingList}
      component={(props: any) => (
        <Layout {...props}>
          <ShoppingListView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.trainings}
      component={(props: any) => (
        <Layout {...props}>
          <TrainingsView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlan}
      component={(props: any) => (
        <Layout {...props}>
          <NutritionPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlanWeight}
      component={(props: any) => (
        <Layout {...props}>
          <WeightGraphicsPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.createRecipe}
      component={(props: any) => (
        <Layout {...props}>
          <CreateRecipeView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.mealPlanList}
      component={(props: any) => (
        <Layout {...props}>
          <FoodPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.recipes}
      component={(props: any) => (
        <Layout {...props}>
          <RecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.waterTracker}
      component={(props: any) => (
        <Layout {...props}>
          <WaterTrackerView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.changeMealSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsChangeMealPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.personalSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsPersonalView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.savedRecipes}
      component={(props: any) => (
        <Layout {...props}>
          <SavedRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.favouritesRecipes}
      component={(props: any) => (
        <Layout {...props}>
          <FavouriteRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.dashboard}
      component={(props: any) => (
        <Layout {...props}>
          <DashboardView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.faqSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFaqView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.referral}
      component={(props: any) => (
        <Layout {...props}>
          <ReferralView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.familySettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFamilyView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.addTestimonial}
      component={(props: any) => (
        <Layout {...props}>
          <TestimonialsFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.cancellation}
      component={(props: any) => (
        <Layout {...props}>
          <CancellationFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.recipeFullView}
      component={(props: any) => (
        <Layout {...props}>
          <RecipeFullView {...props} />
        </Layout>
      )}
      exact
    />

    <AuthRoute
      path={routes.login}
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <AuthRoute
      path={routes.register}
      component={(props: any) => (
        <BasePage {...props}>
          <RegisterView {...props} />
        </BasePage>
      )}
      exact
    />

    <Route component={(props: any) => <NotFound {...props} />} />
  </Switch>
);

export default withRouter(Routes);
