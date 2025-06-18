import { Alert, Button, Card, CardBody, CardHeader, CardHeaderTitle, List, ListItem, Pill } from "@akeso/ui-components";
import { i18nFormatDate } from "@akeso/utils";
import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { ListItemDateTime } from "~/components/list-item-date-time";
import { PageHeader } from "~/components/page-header";
import { PageHeaderTitle } from "~/components/page-header-title";
import { serverFindActiveTodoTasksDueByDepartnemt } from "~/server/rpc/todo-task";

import { DashboardFeatures } from "./dashboard-features";
import { DashboardWelcomeUserCard } from "./dashboard-welcome-user-card";

type TodoTask = {
  dueDate: Date | null;
  href: null | string;
  id: string;
  procedureId: null | string;
  subTitle: null | string;
  title: string;
};

type AmosSlot = {
  id: string;
  startDate: Date;
  title: string;
};

export const usePageData = routeLoader$(async (requestEvent) => {
  // const { user } = serverGetSession(requestEvent);

  // const departments = getDepartmentsForPreview(session.user);

  const todoTasks: TodoTask[] = await serverFindActiveTodoTasksDueByDepartnemt(requestEvent.env, {
    department: "1",
    departmentRole: "foo",
  });

  const amosSlots: AmosSlot[] = [];

  return {
    amosSlots,
    todoTasks,
    // departments,
  };
});

export default component$(() => {
  const pageData = usePageData();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
      </PageHeader>

      <DashboardWelcomeUserCard />

      <div
        class={[
          "mt-8 grid grid-cols-1 gap-4 md:grid-cols-2",
          // "bg-red-300",
          // "sm:bg-blue-300",
          // "md:bg-green-300",
          // "lg:bg-yellow-300",
          // "xl:bg-teal-300",
          "2xl:grid-cols-3",
        ]}
      >
        <DashboardFeatures />

        {/* <DashboardDepartmentsPreview class="md:col-span-2">
          {pageData.value.departments.map((dep) => (
            <DashboardDepartmentsPreviewItem {...dep} key={dep.id} />
          ))}
        </DashboardDepartmentsPreview> */}

        {/* <Card class="row-span-3">
          <CardHeader>
            <CardHeaderTitle>Můj den</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            <CalendarViewDay class="h-56 overflow-x-auto md:h-[50vh]" />
          </CardBody>
        </Card> */}

        <Card>
          <CardHeader>
            <CardHeaderTitle>
              Návštěvy
              {pageData.value.amosSlots.length > 0 && (
                <Pill class="ml-2" severity="success">
                  {pageData.value.amosSlots.length}
                </Pill>
              )}
            </CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {pageData.value.amosSlots.length === 0 && <Alert severity="info">Nemáte žádné plánované návštěvy.</Alert>}
            {pageData.value.amosSlots.length > 0 && (
              <List>
                {pageData.value.amosSlots.map((slot) => (
                  <ListItem class="flex gap-x-4 text-sm" key={slot.id}>
                    <ListItemDateTime time={slot.startDate} />
                    <div class="flex-auto text-gray-950 dark:text-white">{slot.title}</div>
                    <div class="flex items-center gap-1">
                      <Button href="#" size="xs" type="link" variant="outline">
                        Detail
                      </Button>
                      <Button href="#" size="xs" type="link" variant="outline">
                        Schovat
                      </Button>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardHeaderTitle>Úkoly</CardHeaderTitle>
          </CardHeader>
          <CardBody>
            {pageData.value.todoTasks.length === 0 && <Alert severity="info">Nemáte žádné úkoly</Alert>}
            {pageData.value.todoTasks.length > 0 && (
              <List>
                {pageData.value.todoTasks.map((todoTask) => (
                  <ListItem class="relative flex justify-between gap-x-6 py-5" key={todoTask.id}>
                    <div class="min-w-0 flex-auto">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{todoTask.title}</p>
                      <p class="mt-1 truncate text-xs leading-5 text-gray-500">{todoTask.subTitle}</p>
                    </div>
                    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      {/* <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p> */}
                      <p class="mt-1 text-xs leading-5 text-gray-500">
                        {todoTask.dueDate && (
                          <span>
                            Splnit do{" "}
                            <time dateTime={todoTask.dueDate.toISOString()}>{i18nFormatDate(todoTask.dueDate)}</time>
                          </span>
                        )}
                      </p>
                    </div>
                    {todoTask.href != null && (
                      <Link class="absolute inset-0" href={todoTask.href}>
                        <span class="sr-only">{todoTask.title}</span>
                      </Link>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
});
