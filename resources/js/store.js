import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    inboxForUser: [
      {
        ProviderShortName: 'Loading...'
      }
    ],
    inboxForProvider: [
      {
        document: 'Loading...'
      }
    ],
    user: {},
    userRootFolder: {
      rootFolder: ''
    },
    recentDocuments: [
      {
        CanRead: true,
        CanReadWrite: true,
        Created: 'Thu, 08 Nov 2018 11:13:43 GMT',
        Id: '2b00afd1-523e-4494-8628-4c0316ede500',
        IsDeleted: false,
        IsDownloadOnly: false,
        IsEncrypted: false,
        IsIndexed: true,
        IsProcessed: true,
        IsPublic: false,
        IsShared: false,
        IsOffline: false,
        IsAuditProof: false,
        KeyName: null,
        MimeType: 'text/plain',
        Name: 'hi.txt',
        OriginalName: 'hi.txt',
        ParentFolderId: 'd787dc74-f7b4-456a-b622-6cd3ba5d047f',
        FolderId: 'd787dc74-f7b4-456a-b622-6cd3ba5d047f',
        FolderName: 'Policen',
        FolderPath: 'Meine Provider/meine.versicherung/Policen',
        Size: 2,
        Version: 0,
        IsOwnDocument: true,
        DocumentOwner: 'ericnoah',
        DocumentOwnerSid: 'U-9836e5c4-4e07-4825-b0b5-5c550848e841',
        DocumentTypeId: 'be881675-4a88-4aa4-8e51-965f33907267',
        DocumentTypeName: 'Versicherung',
        Modified: 'Thu, 08 Nov 2018 11:13:43 GMT',
        PhysicalFileChanged: 'Thu, 08 Nov 2018 11:13:43 GMT',
        AuditProofUntil: 'Mon, 01 Jan 0001 00:00:00 GMT',
        IsProtected: false,
        IsPublicUntil: false,
        PublicUntil: ''
      },
      {
        CanRead: true,
        CanReadWrite: true,
        Created: 'Thu, 03 Jan 2019 16:18:04 GMT',
        Id: 'dff1f5b3-1030-41ba-a1b9-76934c902247',
        IsDeleted: false,
        IsDownloadOnly: false,
        IsEncrypted: false,
        IsIndexed: true,
        IsProcessed: true,
        IsPublic: false,
        IsShared: false,
        IsOffline: false,
        IsAuditProof: false,
        KeyName: null,
        MimeType: 'image/png',
        Name: 'Stundenplan WS.png',
        OriginalName: 'Stundenplan WS.png',
        ParentFolderId: 'd787dc74-f7b4-456a-b622-6cd3ba5d047f',
        FolderId: 'd787dc74-f7b4-456a-b622-6cd3ba5d047f',
        FolderName: 'Policen',
        FolderPath: 'Meine Provider/meine.versicherung/Policen',
        Size: 163030,
        Version: 0,
        IsOwnDocument: true,
        DocumentOwner: 'ericnoah',
        DocumentOwnerSid: 'U-9836e5c4-4e07-4825-b0b5-5c550848e841',
        DocumentTypeId: 'be881675-4a88-4aa4-8e51-965f33907267',
        DocumentTypeName: 'Versicherung',
        Modified: 'Thu, 03 Jan 2019 16:18:04 GMT',
        PhysicalFileChanged: 'Thu, 03 Jan 2019 16:18:04 GMT',
        AuditProofUntil: 'Mon, 01 Jan 0001 00:00:00 GMT',
        IsProtected: false,
        IsPublicUntil: false,
        PublicUntil: ''
      }
    ],
    recentFolders: [
      {
        Created: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Name: 'Fotos',
        Id: 'e90741ae-8b8e-4f7e-90d3-1c57936c700c',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'd02d7f8a-7c6e-47a8-980a-ad46e6c1933d',
        IsFav: false,
        IsShared: false,
        Path: 'Fotos',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Name: 'Job',
        Id: '4798aa78-1275-43d7-9131-7bb8d08bca28',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'b056f2c3-59be-4038-adf3-24728e9376df',
        IsFav: false,
        IsShared: false,
        Path: 'Job',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Thu, 08 Nov 2018 11:13:42 GMT',
        Modified: 'Thu, 08 Nov 2018 11:13:42 GMT',
        Name: 'Meine Provider',
        Id: '9469c4f3-a8f0-49bd-8127-e0906b454204',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: '00000000-0000-0000-0000-000000000000',
        IsFav: false,
        IsShared: false,
        Path: 'Meine Provider',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 1
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:46 GMT',
        Name: 'Rechnungen',
        Id: 'fe5d6f21-4d41-47cc-a526-96dec133475c',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: '2822007a-9188-41bb-a8b6-09b89211e9a8',
        IsFav: false,
        IsShared: false,
        Path: 'Rechnungen',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 1
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Name: 'Schriftwechsel',
        Id: 'd0f0ad72-4dee-442a-947e-839804b67651',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'b6704a3c-2cb4-4fd5-9c0f-b9ba0025f3eb',
        IsFav: false,
        IsShared: false,
        Path: 'Schriftwechsel',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Name: 'Sonstiges',
        Id: '60e80b42-0f00-424b-b4dd-722a18b9a8f6',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'b056f2c3-59be-4038-adf3-24728e9376df',
        IsFav: false,
        IsShared: false,
        Path: 'Sonstiges',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Name: 'Steuer',
        Id: 'acbdb472-f564-4fa3-88c5-8dd03602adc6',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'dd72a8b7-0558-4c05-a9e2-b595a979ce1b',
        IsFav: false,
        IsShared: false,
        Path: 'Steuer',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Name: 'Versicherungen',
        Id: 'ea79f760-3ccb-49da-a958-6a34002c0efc',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: 'be881675-4a88-4aa4-8e51-965f33907267',
        IsFav: false,
        IsShared: false,
        Path: 'Versicherungen',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      },
      {
        Created: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Modified: 'Wed, 07 Nov 2018 20:39:47 GMT',
        Name: 'Verträge',
        Id: '308c6843-dc5d-4066-a076-933289cbf295',
        ParentFolderId: '4b6c05d5-02e4-407d-9928-b5a2183d2886',
        DefaultDocTypeId: '01060e58-2292-409a-9afb-85905b98d8c1',
        IsFav: false,
        IsShared: false,
        Path: 'Verträge',
        IsAuditProof: false,
        AuditProofUntil: '',
        DocumentCount: 0,
        FolderCount: 0
      }
    ]
  },
  plugins: [createPersistedState()],
  getters: {
    getUserInbox(state) {
      return state.inboxForUser;
    },
    getProviderInbox(state) {
      return state.inboxForProvider;
    },
    getUser(state) {
      return state.user;
    },
    getRecentDocuments(state) {
      return state.recentDocuments;
    },
    getRecentFolders(state) {
      return state.recentFolders;
    },
    getUserRootFolder(state) {
      return state.rootFolder;
    }
  },
  mutations: {
    setUserInbox(state, newProviderList) {
      state.inboxForUser = newProviderList;
    },
    setProviderInbox(state, newProviderInbox) {
      state.inboxForProvider = newProviderInbox;
    },
    setUser(state, newUser) {
      state.user = newUser;
    },
    setRecentDocuments(state, newDocumentList) {
      state.recentDocuments = newDocumentList;
    },
    setRecentFolders(state, newFolderList) {
      state.recentFolders = newFolderList;
    },
    setRootFolder(state, newRootFolder) {
      state.rootFolder = newRootFolder;
    }
  },
  actions: {
    resetUserInbox({ commit }) {
      commit('setUserInbox', [
        {
          ProviderShortName: 'Loading...'
        }
      ]);
    },
    resetProviderInbox({ commit }) {
      commit('setProviderInbox', [
        {
          document: 'Loading...'
        }
      ]);
    },
    resetUser({ commit }) {
      commit('setUser', [{}]);
    }
  }
});

export default store;
