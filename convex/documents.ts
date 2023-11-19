import {v} from 'convex/values'
import {Doc , Id} from './_generated/dataModel'
import {mutation , query} from './_generated/server'

export const getSidebar = query({
    args : {
        parentDocument : v.optional(v.id('documents'))
    } ,
    handler : async (ctx , args) => {
        const identity  = await ctx.auth.getUserIdentity()
        if(!identity) throw new Error('You must be sing in')
        const userId = identity.subject
        
        const documents = await ctx.db
         .query('documents')
         .withIndex('by_user_parent' , q => 
         q
          .eq('userId' , userId)
          .eq('parentDocument' , args.parentDocument)
        )
        .filter(q =>
            q.eq(q.field('isArchived'), false) )
        .order('desc')
        .collect() ;

        return documents ;
    }
})

export const create = mutation({
    args : {
        title : v.string() ,
        parentDocument : v.optional(v.id('documents'))
    } ,
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity() ;
        if(!identity) {
            throw new Error ('you must login')
        }

        const userId = identity.subject

        const document = await ctx.db.insert('documents' , {
            title : args.title ,
            parentDocument : args.parentDocument ,
            userId ,
            isArchived : false ,
            isPublished : false
        })
    }
})

export const archived = mutation({
    args : {id : v.id("documents")},
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error ('you must login')
        }
        const userId = identity.subject

        const existDocuments = await ctx.db.get(args.id)

        if(!existDocuments) throw new Error('Unauthorized')

        const recursiceArchive = async (documentId : Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex('by_user_parent' , q => (
                    q
                     .eq('userId' , userId)
                     .eq('parentDocument' , documentId)
                ))
                .collect();

            for ( const child of children) {
                await ctx.db.patch(child._id , {
                    isArchived : true ,
                })
                await recursiceArchive(child._id)
            }
        }

        const document = await ctx.db.patch(args.id , {
            isArchived : true 
        })

        recursiceArchive(args.id)

        return document
    }
})