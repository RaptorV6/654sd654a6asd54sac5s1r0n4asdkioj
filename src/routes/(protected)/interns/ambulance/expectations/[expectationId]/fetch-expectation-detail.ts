import type {
  InternsAmbExpectationGenqlSelection,
  InternsAmbExpectationInvasionGenqlSelection,
  InternsAmbExpectationMedicationGenqlSelection,
  InternsAmbExpectationOrdinationGenqlSelection,
  InternsAmbExpectationPhysioFunctionGenqlSelection,
  IrisClientOrEnv,
} from "~/iris";

import { createIrisClient } from "~/iris";

export const ExpectationScalarFragment = {
  arrivalKind: true,
  arrivalKindText: true,
  bioMaterialCollection: true,
  bioMaterialCollectionInfo: true,
  bioMaterialCollectionOther: true,
  breath: true,
  breathO2Note: true,
  defect: true,
  endAt: true,
  id: true,
  idCardPossession: true,
  insuranceCardPossession: true,
  note: true,
  priority: true,
  release: true,
  startAt: true,
  status: true,
  stomia: true,
  transportation: true,
} satisfies InternsAmbExpectationGenqlSelection;

export const InvasionFragment = {
  caliber: true,
  createdAt: true,
  editable: true,
  expectationId: true,
  id: true,
  kind: true,
  locality: true,
  note: true,
  performed: true,
} satisfies InternsAmbExpectationInvasionGenqlSelection;

export const MedicationFragment = {
  createdAt: true,
  doneAt: true,
  expectationId: true,
  id: true,
  instruction: true,
} satisfies InternsAmbExpectationMedicationGenqlSelection;

export const OrdinationFragment = {
  createdAt: true,
  doneAt: true,
  expectationId: true,
  id: true,
  instruction: true,
} satisfies InternsAmbExpectationOrdinationGenqlSelection;

export const PhysiologicFunctionFragment = {
  bloodPressure: true,
  createdAt: true,
  editable: true,
  expectationId: true,
  id: true,
  note: true,
  pain: true,
  pulse: true,
  saturation: true,
} satisfies InternsAmbExpectationPhysioFunctionGenqlSelection;

const _fetchExpectationDetail = (iris: IrisClientOrEnv, expectationId: string) =>
  createIrisClient(iris).query({
    internsAmbExpectation: {
      __args: {
        id: expectationId,
      },
      ...ExpectationScalarFragment,
      invasions: InvasionFragment,
      medications: MedicationFragment,
      ordinations: OrdinationFragment,
      patient: {
        address: {
          full: true,
        },
        birthRegistrationNumber: true,
        fullName: true,
        sex: true,
      },
      physiologicFunctions: PhysiologicFunctionFragment,
    },
  });

export const fetchExpectationDetail = async (
  irisOrEnv: IrisClientOrEnv,
  expectationId: string,
): Promise<{ internsAmbExpectation: ExpectationDetailData | null }> => {
  return _fetchExpectationDetail(irisOrEnv, expectationId);
};

export type ExpectationDetailData = NonNullable<
  Awaited<ReturnType<typeof _fetchExpectationDetail>>["internsAmbExpectation"]
>;

export async function fetchExpectationDetailScalars(irisOrEnv: IrisClientOrEnv, id: string) {
  const { internsAmbExpectation } = await createIrisClient(irisOrEnv).query({
    internsAmbExpectation: {
      __args: {
        id,
      },
      ...ExpectationScalarFragment,
    },
  });
  return internsAmbExpectation;
}

export async function fetchExpectationDetailInvasion(irisOrEnv: IrisClientOrEnv, id: string) {
  const { internsAmbExpectationInvasion } = await createIrisClient(irisOrEnv).query({
    internsAmbExpectationInvasion: {
      __args: {
        id,
      },
      ...InvasionFragment,
    },
  });
  return internsAmbExpectationInvasion;
}

export async function fetchExpectationDetailMedication(irisOrEnv: IrisClientOrEnv, id: string) {
  const { internsAmbExpectationMedication } = await createIrisClient(irisOrEnv).query({
    internsAmbExpectationMedication: {
      __args: {
        id,
      },
      ...MedicationFragment,
    },
  });
  return internsAmbExpectationMedication;
}

export async function fetchExpectationDetailOrdination(irisOrEnv: IrisClientOrEnv, id: string) {
  const { internsAmbExpectationOrdination } = await createIrisClient(irisOrEnv).query({
    internsAmbExpectationOrdination: {
      __args: {
        id,
      },
      ...OrdinationFragment,
    },
  });
  return internsAmbExpectationOrdination;
}

export async function fetchExpectationDetailPhysiologicFunction(irisOrEnv: IrisClientOrEnv, id: string) {
  const { internsAmbExpectationPhysiologicFunction } = await createIrisClient(irisOrEnv).query({
    internsAmbExpectationPhysiologicFunction: {
      __args: {
        id,
      },
      ...PhysiologicFunctionFragment,
    },
  });
  return internsAmbExpectationPhysiologicFunction;
}
